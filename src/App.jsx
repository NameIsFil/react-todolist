import { ToDoList } from "./ToDoList/ToDoList.jsx";
import { useState } from 'react'
import './App.css'

export default function App() {
    return (
        <div>
            <h1>To Do List</h1>
            <ToDoList />
        </div>
    );
}