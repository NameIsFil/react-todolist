import * as styles from './styles.module.css';
import {TaskStatusEnum} from "../ToDoList/ToDoList.jsx";
import {ToDoList} from "../ToDoList/ToDoList.jsx";

export function Column(props) {
    const title = props.title;

    function moveRight(task) {
        if(task.status === TaskStatusEnum.ToDo) {
            task.status = TaskStatusEnum.Doing;
            setTasksArrayHelper(task, props)
            return;
        }
        if(task.status === TaskStatusEnum.Doing) {
            task.status = TaskStatusEnum.Done;
            setTasksArrayHelper(task, props)
            return;
        }
        if(task.status === TaskStatusEnum.Done) {
            setTasksArrayHelper(task, props)
            return;
        }
    }

    function moveLeft(task) {
        if(task.status === TaskStatusEnum.ToDo) {
            setTasksArrayHelper(task, props)
            return;
        }
        if(task.status === TaskStatusEnum.Doing) {
            task.status = TaskStatusEnum.ToDo;
            setTasksArrayHelper(task, props)
            return;
        }
        if(task.status === TaskStatusEnum.Done) {
            task.status = TaskStatusEnum.Doing;
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
                                <button onClick={() => moveRight(task)}>Move Right</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}