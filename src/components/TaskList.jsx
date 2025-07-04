// src/components/TaskList.jsx
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import TaskForm from './TaskForm'
import TaskItem from './TaskItem'
import TaskFilter from './TaskFilter'
import { loadTasks, saveTasks } from '../utils/localStorage'

const TaskList = () => {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')
  const [editingTask, setEditingTask] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const navigate = useNavigate()

  // === Load tasks & check login ===
  useEffect(() => {
    const username = localStorage.getItem('username')
    if (!username) navigate('/')
    const savedTasks = loadTasks()
    setTasks(savedTasks)
  }, [])

  // === Save tasks to localStorage ===
  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  // === Add new task ===
  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      completed: false,
    }
    setTasks((prev) => [...prev, newTask])
  }

  // === Delete task ===
  const deleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks((prev) => prev.filter((task) => task.id !== id))
    }
  }

  // === Toggle completion ===
  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  // === Update task ===
  const updateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    )
    setEditingTask(null)
  }

  // === Filtered & searched tasks ===
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed
    if (filter === 'pending') return !task.completed
    return true
  })

  const visibleTasks = filteredTasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <main className="dashboard">
      <h2>Welcome, {localStorage.getItem('username')} 👋</h2>

      <TaskForm
        addTask={addTask}
        editingTask={editingTask}
        updateTask={updateTask}
      />

      {/* 🔍 Search Input */}
      <input
        type="text"
        placeholder="🔍 Search tasks by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search tasks by title"
        style={{
          padding: '0.6rem',
          width: '100%',
          margin: '1rem 0',
          borderRadius: '6px',
          border: '1px solid #ccc',
        }}
      />

      <TaskFilter filter={filter} setFilter={setFilter} tasks={tasks} />

      <div className="task-list">
        {visibleTasks.length === 0 ? (
          <p style={{ marginTop: '1rem', fontStyle: 'italic' }}>
            {tasks.length === 0
              ? 'No tasks added yet. Start by adding one!'
              : 'No tasks match your search.'}
          </p>
        ) : (
          visibleTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={setEditingTask}
              onDelete={deleteTask}
              onToggle={toggleTask}
            />
          ))
        )}
      </div>
    </main>
  )
}

export default TaskList
