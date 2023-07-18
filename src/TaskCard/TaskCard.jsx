import * as styles from "./styles.module.css";
import {Link} from "react-router-dom";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { createTheme } from '@mui/material/styles';
import { purple, pink, grey } from '@mui/material/colors';

export function TaskCard(props) {
    const task = props.task
    async function removeTask(task) {
        const postResponse = await fetch(`http://localhost:3000/tasks/${task.id}`, {
            method: 'DELETE'
        });
        props.fetchTasks()
    }

    async function changeTaskStatus(task, taskStatus) {
        const postResponse = await fetch(`http://localhost:3000/tasks/${task.id}`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({
                status: taskStatus,
            }),
        });
        props.fetchTasks()
    }

    function moveRight(task) {
        if(task.status === "ToDo") {
            task.status = "Doing";
            changeTaskStatus(task, task.status)
            return;
        }
        if(task.status === "Doing") {
            task.status = "Done";
            changeTaskStatus(task, task.status);
            return;
        }
        if(task.status === "Done") {
            return;
        }
    }

    function moveLeft(task) {
        if(task.status === "ToDo") {
            return;
        }
        if(task.status === "Doing") {
            task.status = "ToDo";
            changeTaskStatus(task, task.status);
            return;
        }
        if(task.status === "Done") {
            task.status = "Doing";
            changeTaskStatus(task, task.status);
            return;
        }
    }

    return (
        <div className={styles.taskCard} key={task.id}>
            <div className={styles.topBar}>
                <p>{task.title}</p>
                <Link className={styles.buttonLink} to={`/details/${task.id}`}>
                    <AddIcon sx={{ color: grey[100] }} />
                </Link>
            </div>
            <div className={styles.divider} />
            <div className={styles.buttonBar}>
                <IconButton className={styles.buttonLeft} onClick={() => moveLeft(task)}>
                    <ArrowLeftIcon sx={{ color: grey[100] }} />
                </IconButton>
                <IconButton className={styles.buttonTrash} onClick={() => removeTask(task)}>
                    <HighlightOffIcon sx={{ color: grey[100] }} />
                </IconButton>
                <IconButton className={styles.buttonRight} onClick={() => moveRight(task)}>
                    <ArrowRightIcon sx={{ color: grey[100] }} />
                </IconButton>
            </div>
        </div>
    )
}