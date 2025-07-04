// src/components/TaskForm.jsx
import { useEffect, useState } from 'react'

const TaskForm = ({ addTask, editingTask, updateTask }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('low')
  const [dueDate, setDueDate] = useState('')

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title)
      setDescription(editingTask.description)
      setPriority(editingTask.priority || 'low')
      setDueDate(editingTask.dueDate || '')
    } else {
      setTitle('')
      setDescription('')
      setPriority('low')
      setDueDate('')
    }
  }, [editingTask])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (title.trim() === '') {
      alert('Task title is required')
      return
    }

    const newTask = {
      ...editingTask,
      title,
      description,
      priority,
      dueDate
    }

    if (editingTask) {
      updateTask(newTask)
    } else {
      addTask(newTask)
    }

    setTitle('')
    setDescription('')
    setPriority('low')
    setDueDate('')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h3>{editingTask ? 'Edit Task' : 'Add New Task'}</h3>

      <input
        type="text"
        placeholder="Task Title *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
      </select>

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button type="submit">{editingTask ? 'Update' : 'Add'} Task</button>
    </form>
  )
}

export default TaskForm
