import { useState } from 'react';
import * as styles from './styles.module.css';

export function AddTaskInput(props) {
    const [inputValue, setInputValue] = useState(null)

    async function addTask() {
        const response = await fetch("http://localhost:3000/tasks", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
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
            <label >
                <input name="addTask" type="text" onInput={handleInput} />
            </label>
            <button onClick={addTask}>Add</button>
        </div>
    )
}




