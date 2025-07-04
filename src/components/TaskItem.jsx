// src/components/TaskItem.jsx
const TaskItem = ({ task, onEdit, onDelete, onToggle }) => {
  const { id, title, description, completed, createdAt, priority, dueDate } = task

  const formattedDate = new Date(createdAt).toLocaleString()

  return (
    <div className={`task-item ${completed ? 'completed' : ''}`}>
      <div className="task-main">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(id)}
        />
        <div className="task-info">
          <h4>{title}</h4>
          <p>{description}</p>
          <p>Priority: <strong>{priority}</strong></p>
          {dueDate && (
            <p>Due Date: <strong>{new Date(dueDate).toLocaleDateString()}</strong></p>
          )}
          <small>Created At: {formattedDate}</small>
        </div>
      </div>
      <div className="task-actions">
        <button onClick={() => onEdit(task)}>✏️ Edit</button>
        <button onClick={() => onDelete(id)}>🗑 Delete</button>
      </div>
    </div>
  )
}

export default TaskItem
