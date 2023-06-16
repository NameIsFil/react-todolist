import * as styles from './styles.module.css';
import { Link } from "react-router-dom";

export function Column(props) {
    const title = props.title;

    async function removeData(task) {
        const postResponse = await fetch(`http://localhost:3000/tasks/${task.id}`, {
            method: 'DELETE'
        });
        props.fetchTasks()
    }

    async function changeStatus(task, taskStatus) {
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
            changeStatus(task, task.status)
            return;
        }
        if(task.status === "Doing") {
            task.status = "Done";
            changeStatus(task, task.status);
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
            changeStatus(task, task.status);
            return;
        }
        if(task.status === "Done") {
            task.status = "Doing";
            changeStatus(task, task.status);
            return;
        }
    }

    return (
        <section className={styles.column}>
            <h2>{title}</h2>
            <div>
                {props.tasks.map((task) => {
                    return (
                        <div key={task.id}>
                            {task.title}
                            <div className={styles.buttonBar}>
                                <button onClick={() => moveLeft(task)}>Move Left</button>
                                <button onClick={() => removeData(task)}>Delete</button>
                                <button onClick={() => moveRight(task)}>Move Right</button>
                                <Link to={`/details/${task.id}`}>go to details</Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}