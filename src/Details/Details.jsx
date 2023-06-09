import {useState} from "react";
import {useParams} from "react-router-dom";

export function Details() {
    const [taskDetails, setTaskDetails] = useState()
    const { taskId } = useParams();
    async function fetchTasks() {
        const postResponse = await fetch(
            `http://localhost:3000/tasks/${taskId}`
        );
        const tasksData = await postResponse.json();
        setTaskDetails(tasksData)
    }
    fetchTasks()
    return <p>{JSON.stringify(taskDetails)}</p>
}