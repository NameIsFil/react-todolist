import { Column } from "../Column/Column.jsx";
import './styles.css';
import { useMemo, useState } from 'react';

const TaskStatusEnum = {
    ToDo: 'ToDo',
    Doing: 'Doing',
    Done: 'Done',
}

const tasksArray = [
    {
        title: "Wash the dishes",
        status: TaskStatusEnum.ToDo,
    },
    {
        title: "Throw away the trash",
        status: TaskStatusEnum.Doing,
    }
]

export function ToDoList() {
    // const useState all tasks

    // handle add task

    const {toDo, doing, done} = useMemo(() => {
        const toDo = [];
        const doing = [];
        const done = [];

        tasksArray.forEach((task) => {
            if(task.status === TaskStatusEnum.ToDo) {
                toDo.push(task)
            }
            if(task.status === TaskStatusEnum.Doing) {
                doing.push(task)
            }
            if(task.status === TaskStatusEnum.Done) {
                done.push(task)
            }
        })

        return {toDo, doing, done}
    }, [tasksArray])

    return (
        <div>
            <AddTaskInput />
            <br />
            <div className="toDoList">
                <Column title="To Do" tasks={toDo}/>
                <Column title="Doing" tasks={doing}/>
                <Column title="Done" tasks={done}/>
            </div>
        </div>
    )
}

function AddTaskInput() {

    function AddTask() {
        
    }

    return (
        <div>
            <label for="task">Enter Task</label>
            <br />
            <input />
            <button>Add</button>
        </div>
    )
}

// finalnie bedziesz musiał integrować się z API - json server
// moveLeft / moveRight
// createTask
// deleteTask
// editTask (mniejszy priorytet)
// ostylować to sensownie