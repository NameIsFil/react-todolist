import { Column } from "../Column/Column.jsx";
import { useMemo, useState } from 'react';
import {AddTaskInput} from "../AddTasksInput/AddTasksInput.jsx";
import * as styles from './styles.module.css';


async function fetchTasks() {
    const postResponse = await fetch(
        `http://localhost:3000/tasks`
    );
    const tasksData = await postResponse.json();
    console.log(tasksData);
}

async function addTaskToJson(taskCard) {
    const dataToSend = JSON.stringify(taskCard);
    try {
        const response = await fetch(`http://localhost:3000/tasks`, {
            method: "POST",
            body: dataToSend
        });
        console.log("The task was added");
    } catch (error) {
        console.log('Failed to add', error);
    }
}



export const TaskStatusEnum = {
    ToDo: 'ToDo',
    Doing: 'Doing',
    Done: 'Done',
}

const initialTasks = [
    {
        id: 1,
        title: "Wash the dishes",
        status: TaskStatusEnum.ToDo,
    },
    {
        id: 2,
        title: "Throw away the trash",
        status: TaskStatusEnum.Doing,
    }
]

export function ToDoList() {
    const [tasksArray, setTasksArray] = useState(initialTasks)

    const {toDo, doing, done} = useMemo(() => {
        const toDo = [];
        const doing = [];
        const done = [];

        tasksArray.forEach((task) => {
            if(task.status === TaskStatusEnum.ToDo) {
                toDo.push(task)
            }
            if(task.status === TaskStatusEnum.Doing) {
                doing.push(task)
            }
            if(task.status === TaskStatusEnum.Done) {
                done.push(task)
            }
        })
        fetchTasks();
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