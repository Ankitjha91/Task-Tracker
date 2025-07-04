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
      setDescription(editingTask.description || '')
      setPriority(editingTask.priority || 'low')
      setDueDate(editingTask.dueDate || '')
    } else {
      resetForm()
    }
  }, [editingTask])

  const resetForm = () => {
    setTitle('')
    setDescription('')
    setPriority('low')
    setDueDate('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim() === '') {
      alert('Task title is required')
      return
    }

    const newTask = {
      ...editingTask,
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate,
    }

    if (editingTask) {
      updateTask(newTask)
    } else {
      addTask(newTask)
    }

    resetForm()
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h3>{editingTask ? '✏️ Edit Task' : '➕ Add New Task'}</h3>

      <div>
        <label htmlFor="title">Task Title *</label>
        <input
          id="title"
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          placeholder="Optional description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">🟢 Low</option>
          <option value="medium">🟡 Medium</option>
          <option value="high">🔴 High</option>
        </select>
      </div>

      <div>
        <label htmlFor="dueDate">Due Date</label>
        <input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <button type="submit">
        {editingTask ? '✅ Update Task' : '➕ Add Task'}
      </button>
    </form>
  )
}

export default TaskForm
