// import * as styles from './styles.module.css'
import './styles.css';

export function Column(props) {
    const title = props.title;

    return (
        <section className="column">
            <h2>{title}</h2>
            <div>
                {props.tasks.map((task) => {
                    return <div>{task.title}</div>
                })}
            </div>
        </section>
    )
}