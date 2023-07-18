import { Column } from "../Column/Column.jsx";
import { useMemo, useState, useEffect } from 'react';
import {AddTaskInput} from "../AddTasksInput/AddTasksInput.jsx";
import * as styles from './styles.module.css';

export function ToDoList() {
    const [tasksArray, setTasksArray] = useState([])

    useEffect(() => {
        fetchTasks()
    }, [])

    const {toDo, doing, done} = useMemo(() => {
        const toDo = [];
        const doing = [];
        const done = [];

        tasksArray.forEach((task) => {
            if(task.status === "ToDo") {
                toDo.push(task)
            }
            if(task.status === "Doing") {
                doing.push(task)
            }
            if(task.status === "Done") {
                done.push(task)
            }
        })
        return {toDo, doing, done}
    }, [tasksArray])

    async function fetchTasks() {
        const postResponse = await fetch(`http://localhost:3000/tasks`);
        const tasksData = await postResponse.json();
        setTasksArray(tasksData)
    }

    return (
        <div className={styles.desktopBackground}>
            <div className={styles.topBar}>
                <div className={styles.logoBar}>
                    <div className={styles.logo} />
                    <div>
                        <p className={styles.logoText}>TASKMASTER</p>
                    </div>
                </div>
            </div>
            <div className={styles.bottomBar}>
                <div className={styles.inputField}>
                    <h1 className={styles.title}>To Do List</h1>
                    <div className={styles.line}></div>
                    <AddTaskInput tasksArray={tasksArray} setTasksArray={setTasksArray} fetchTasks={fetchTasks}/>
                </div>
                <div className={styles.toDoList}>
                    <Column tasksArray={tasksArray} setTasksArray={setTasksArray} fetchTasks={fetchTasks} title="To Do" tasks={toDo}/>
                    <Column tasksArray={tasksArray} setTasksArray={setTasksArray} fetchTasks={fetchTasks} title="Doing" tasks={doing}/>
                    <Column tasksArray={tasksArray} setTasksArray={setTasksArray} fetchTasks={fetchTasks} title="Done" tasks={done}/>
                </div>
            </div>
        </div>
    )
}