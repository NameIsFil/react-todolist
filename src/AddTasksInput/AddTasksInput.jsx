import { useState } from 'react';
import * as styles from './styles.module.css';

export function AddTaskInput(props) {
    const [inputValue, setInputValue] = useState(null)

    async function addTask() {
        const response = await fetch("http://localhost:3000/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: inputValue,
                status: "ToDo",
            }),
        });
        props.fetchTasks()
        return response.json();
    }

    function handleInput(event) {
        setInputValue(event.target.value)
    }

    return (
        <div className={styles.inputBar}>
            <label>
                <input className={styles.inputBox} name="addTask" type="text" onInput={handleInput} type={"text"}/>
                <input className={styles.inputButton} onClick={addTask} value="Add" type={"submit"} />
            </label>
        </div>
    )
}




