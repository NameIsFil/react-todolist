import { Column } from "../Column/Column.jsx";
import { useMemo, useState, useEffect } from 'react';
import {AddTaskInput} from "../AddTasksInput/AddTasksInput.jsx";
import * as styles from './styles.module.css';

const initialTasks = [
    {
        id: 1,
        title: "Wash the dishes",
        status: "ToDo",
    },
    {
        id: 2,
        title: "Throw away the trash",
        status: "Doing",
    }
]

export function ToDoList() {
    const [tasksArray, setTasksArray] = useState(initialTasks)

    useEffect(() => {
        fetch(`http://localhost:3000/tasks`)
            .then(res => res.json())
            .then(data => setTasksArray(data))
    }, [tasksArray])

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

    return (
        <div>
            <h1 className={styles.title}>To Do List</h1>
            <AddTaskInput tasksArray={tasksArray} setTasksArray={setTasksArray}/>
            <br />
            <div className={styles.toDoList}>
                <Column tasksArray={tasksArray} setTasksArray={setTasksArray} title="To Do" tasks={toDo}/>
                <Column tasksArray={tasksArray} setTasksArray={setTasksArray} title="Doing" tasks={doing}/>
                <Column tasksArray={tasksArray} setTasksArray={setTasksArray} title="Done" tasks={done}/>
            </div>
        </div>
    )
}