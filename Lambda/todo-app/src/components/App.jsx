import React, {useState, useEffect } from 'react';
import TaskForm from './tasks/taskForm/TaskForm'

function App() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (tasks.length === 0 ) {
            if (localStorage.getItem('tasks')) {
             setTasks(JSON.parse(localStorage.getItem('tasks'))); //because local storage stores it in local obj, we need to parse it before we get it
            }
         }    
    }, [])

    useEffect(() => {
        if (localStorage.getItem('tasks') && JSON.parse(localStorage.getItem('tasks').length !== tasks.length)) {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }, [tasks.length])

    return (
        <div>
           <TaskForm setTasks={setTasks} tasks={tasks}/> 
        </div>
    )
}

export default App
