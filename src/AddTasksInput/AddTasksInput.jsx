import { useState } from 'react';
import * as styles from './styles.module.css';

export function AddTaskInput(props) {
    const [inputValue, setInputValue] = useState(null)

    // function handleAdd() {
    //     props.setTasksArray([...props.tasksArray, {
    //         id: props.tasksArray.length + 1,
    //         title: inputValue,
    //         status: "ToDo",
    //     }])
    // }

    async function addTaskToJson() {
        try {
            let taskData = JSON.stringify({
                id: props.tasksArray.length + 1,
                title: inputValue,
                status: "ToDo",
            })
            const response = await fetch(`http://localhost:3000/tasks`, {
                method: "POST",
                body: taskData,
            });
            console.log(taskData);
            console.log("The task was added");
        } catch (error) {
            console.log('Failed to add', error);
        }
    }

    function handleInput(event) {
        setInputValue(event.target.value)
    }

    return (
        <div className={styles.inputBar}>
            <label >
                <input name="addTask" type="text" onInput={handleInput} />
            </label>
            <button onClick={addTaskToJson}>Add</button>
        </div>
    )
}




