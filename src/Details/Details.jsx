import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import * as styles from './styles.module.css';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import BackspaceIcon from '@mui/icons-material/Backspace';

export function Details() {
    const [taskDetails, setTaskDetails] = useState(null) // add circular progress from mui (if detail = null, return circular progress)
    const { taskId } = useParams();

    async function removeTask() {
        const postResponse = await fetch(`http://localhost:3000/tasks/${taskId}`, {
            method: 'DELETE'
        });
    }

    async function fetchTasks() {
        const postResponse = await fetch(
            `http://localhost:3000/tasks/${taskId}`
        );
        const tasksData = await postResponse.json();
        setTaskDetails(tasksData)
    }

    useEffect(() => {
        fetchTasks()
    }, [])


    return (
        <div className={styles.desktopBackground}>
            <div className={styles.topBar}>
                <div className={styles.logoBar}>
                    <div className={styles.logo} />
                    <div>
                        <p className={styles.logoText}>TASKMASTER</p>
                    </div>
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.taskCard}>
                    <div className={styles.taskCardTitle}>
                        <h2 className={styles.taskTitle}>TASK</h2>
                    </div>
                    <div className={styles.divider}></div>
                    <div className={styles.taskCardContent}>
                        <p>{JSON.stringify(taskDetails)}</p>

                    </div>
                    <div className={styles.divider}></div>
                    <div className={styles.buttonBar}>
                            <Button color="secondary" variant="contained" startIcon={<EditIcon />}>
                                Edit
                            </Button>
                        <Link to={'/'}>
                            <Button onClick={() => removeTask()} color="secondary" variant="contained" startIcon={<DeleteIcon />}>
                                Delete
                            </Button>
                        </Link>
                        <Link to={'/'}>
                            <Button color="secondary" variant="contained" startIcon={<BackspaceIcon />}>
                                Back
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

