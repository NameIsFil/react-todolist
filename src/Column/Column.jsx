import * as styles from './styles.module.css';
import { Link } from "react-router-dom";

export function Column(props) {
    const title = props.title;

    function deleteTask(task) {
        const tasksArray = props.tasksArray;
        tasksArray.forEach((taskFromArray, index) => {
            if (task.id === taskFromArray.id) {
                tasksArray.splice(index, 1);
                props.setTasksArray([...tasksArray]);
                return;
            }
        })
    }

    function moveRight(task) {

        if(task.status === "ToDo") {
            task.status = "Doing";
            setTasksArrayHelper(task, props)
            return;
        }
        if(task.status === "Doing") {
            task.status = "Done";
            setTasksArrayHelper(task, props)
            return;
        }
        if(task.status === "Done") {
            setTasksArrayHelper(task, props)
            return;
        }
    }

    function moveLeft(task) {
        if(task.status === "ToDo") {
            setTasksArrayHelper(task, props)
            return;
        }
        if(task.status === "Doing") {
            task.status = "ToDo";
            setTasksArrayHelper(task, props)
            return;
        }
        if(task.status === "Done") {
            task.status = "Doing";
            setTasksArrayHelper(task, props)
            return;
        }
    }

    function setTasksArrayHelper(task, props) {
        let newArray;
        let tasksArray = props.tasksArray;
        tasksArray.forEach((taskFromArray) => {
            if (task.id === taskFromArray.id) {
                taskFromArray.status = task.status;
                newArray = tasksArray.slice()
                props.setTasksArray(newArray);
                return;
            }
        })
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
                                <button onClick={() => deleteTask(task)}>Delete</button>
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