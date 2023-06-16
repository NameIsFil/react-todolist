import * as styles from './styles.module.css';
import {TaskCard} from "../TaskCard/TaskCard.jsx";

export function Column(props) {
    const title = props.title;
    const fetchTasks = props.fetchTasks;

    return (
        <section className={styles.column}>
            <h2>{title}</h2>
            <div>
                {props.tasks.map((task) => {
                    return (
                        <TaskCard task={task} fetchTasks={fetchTasks} />
                    )
                })}
            </div>
        </section>
    )
}