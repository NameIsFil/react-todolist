import * as styles from "./styles.module.css";
import {Link} from "react-router-dom";

export function TaskCard(props) {
    const task = props.task
    async function removeTask(task) {
        const postResponse = await fetch(`http://localhost:3000/tasks/${task.id}`, {
            method: 'DELETE'
        });
        props.fetchTasks()
    }

    async function changeTaskStatus(task, taskStatus) {
        const postResponse = await fetch(`http://localhost:3000/tasks/${task.id}`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({
                status: taskStatus,
            }),
        });
        props.fetchTasks()
    }

    function moveRight(task) {
        if(task.status === "ToDo") {
            task.status = "Doing";
            changeTaskStatus(task, task.status)
            return;
        }
        if(task.status === "Doing") {
            task.status = "Done";
            changeTaskStatus(task, task.status);
            return;
        }
        if(task.status === "Done") {
            return;
        }
    }

    function moveLeft(task) {
        if(task.status === "ToDo") {
            return;
        }
        if(task.status === "Doing") {
            task.status = "ToDo";
            changeTaskStatus(task, task.status);
            return;
        }
        if(task.status === "Done") {
            task.status = "Doing";
            changeTaskStatus(task, task.status);
            return;
        }
    }

    return (
        <div className={styles.taskCard} key={task.id}>
            <p>{task.title}</p>
            <div className={styles.buttonBar}>
                <button onClick={() => moveLeft(task)}>Move Left</button>
                <button onClick={() => removeTask(task)}>Delete</button>
                <button onClick={() => moveRight(task)}>Move Right</button>
                <Link className={styles.buttonLink} to={`/details/${task.id}`}>go to details</Link>
            </div>
        </div>
    )
}