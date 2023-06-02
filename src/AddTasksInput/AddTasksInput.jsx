import { useState } from 'react';
import { TaskStatusEnum } from "../ToDoList/ToDoList.jsx";
import * as styles from './styles.module.css';

export function AddTaskInput(props) {
    const [inputValue, setInputValue] = useState(null)
    function handleAdd() {
        props.setTasksArray([...props.tasksArray, {
            id: props.tasksArray.length + 1,
            title: inputValue,
            status: TaskStatusEnum.ToDo,
        }])
    }

    function handleInput(event) {
        setInputValue(event.target.value)
    }

    return (
        <div className={styles.inputBar}>
            <label >
                <input name="addTask" type="text" onInput={handleInput} />
            </label>
            <button onClick={handleAdd}>Add</button>
        </div>
    )
}
