import React from 'react'
import ReactDOM from 'react-dom/client'
import {ToDoList} from "./ToDoList/ToDoList.jsx";
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import {Details} from "./Details/Details.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route
                  path="/"
                  element={<ToDoList />}
              />
              <Route
                  path="/details/:taskId"
                  element={<Details />}
              />
          </Routes>
      </BrowserRouter>
  </React.StrictMode>
)
