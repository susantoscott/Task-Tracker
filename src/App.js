import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }

    getTasks();
  }, []);

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:8080/tasks');
    const data = await res.json();
    return data;
  }

  // Fetch Task
  const fetchTask = async id => {
    const res = await fetch(`http://localhost:8080/tasks/${id}`);
    const data = await res.json();
    return data;
  }

  // Add Task
  const addTask = async task => {
    const res = await fetch('http://localhost:8080/tasks',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(task)
      })

    const data = await res.json();
    setTasks([...tasks, data]);
  };

  // Delete Task
  const deleteTask = async id => {
    await fetch(`http://localhost:8080/tasks/${id}`, { method: 'DELETE' });

    setTasks(tasks.filter(task => {
      return task.id != id
    }))
  };

  // Toggle Reminder
  const toggleReminder = async id => {
    const taskToToggle = await fetchTask(id);
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:8080/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })

    const data = await res.json();

    setTasks(tasks.map(task => {
      return task.id == id ? { ...task, reminder: data.reminder } : task;
    }))
  };

  // Toggle Display
  const onAdd = () => {
    setShowAddTask(!showAddTask);

  }

  return (
    <Router>
      <div className='container'>
        <Header onShow={onAdd} showAdd={showAddTask} />
        {tasks.length > 0 ?
          <Tasks
            tasks={tasks}
            onDelete={deleteTask}
            onToggle={toggleReminder} /> :
          'All Tasks Completed'
        }
        {showAddTask && <AddTask onAdd={addTask} />}
        <Footer />
      </div>
    </Router>
  )
}

export default App;
