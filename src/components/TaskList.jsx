// src/components/TaskList.jsx
import { useEffect, useState } from 'react'
import TaskForm from './TaskForm'
import TaskItem from './TaskItem'
import TaskFilter from './TaskFilter'
import { loadTasks, saveTasks } from '../utils/localStorage'
import { useNavigate } from 'react-router-dom'

const TaskList = () => {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')
  const [editingTask, setEditingTask] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    const username = localStorage.getItem('username')
    if (!username) navigate('/')
    const savedTasks = loadTasks()
    setTasks(savedTasks)
  }, [])

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  const addTask = (task) => {
    setTasks(prev => [...prev, { ...task, id: Date.now(), createdAt: new Date().toISOString(), completed: false }])
  }

  const deleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prev => prev.filter(task => task.id !== id))
    }
  }

  const toggleTask = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const updateTask = (updatedTask) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      )
    )
    setEditingTask(null)
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed
    if (filter === 'pending') return !task.completed
    return true
  })

  const visibleTasks = filteredTasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="dashboard">
      <h2>Welcome, {localStorage.getItem('username')} 👋</h2>

      <TaskForm addTask={addTask} editingTask={editingTask} updateTask={updateTask} />

      {/* 🔍 Search input */}
      <input
        type="text"
        placeholder="🔍 Search tasks by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem', borderRadius: '6px', border: '1px solid #ccc' }}
      />

      <TaskFilter filter={filter} setFilter={setFilter} tasks={tasks} />

      <div className="task-list">
        {visibleTasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          visibleTasks.map(task => (
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
    </div>
  )
}

export default TaskList
