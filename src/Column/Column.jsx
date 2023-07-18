import * as styles from './styles.module.css';
import {TaskCard} from "../TaskCard/TaskCard.jsx";

export function Column(props) {
    const title = props.title;
    const fetchTasks = props.fetchTasks;

    return (
        <section className={styles.column}>
            <div className={styles.columnTitle}>
                <h2 className={styles.title}>{title}</h2>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.tasksColumn}>
                {props.tasks.map((task) => {
                    return (
                        <TaskCard task={task} fetchTasks={fetchTasks} />
                    )
                })}
            </div>
        </section>
    )
}