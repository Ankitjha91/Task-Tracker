// src/components/TaskItem.jsx

const TaskItem = ({ task, onEdit, onDelete, onToggle }) => {
  const { id, title, description, completed, createdAt, priority, dueDate } = task
  const formattedDate = new Date(createdAt).toLocaleString()
  const isOverdue = dueDate && new Date(dueDate) < new Date() && !completed

  return (
    <div className={`task-item ${completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}>
      <div className="task-main">
        <input
          type="checkbox"
          id={`task-${id}`}
          checked={completed}
          onChange={() => onToggle(id)}
          aria-label={`Mark ${title} as ${completed ? 'incomplete' : 'complete'}`}
        />

        <div className="task-info">
          <h4>{title}</h4>

          {description && <p>{description}</p>}

          <p>
            Priority: <strong>{priority}</strong>
          </p>

          {dueDate && (
            <p className="due-date">
              Due: <strong>{new Date(dueDate).toLocaleDateString()}</strong>
            </p>
          )}

          <small>Created: {formattedDate}</small>
        </div>
      </div>

      <div className="task-actions">
        <button onClick={() => onEdit(task)} aria-label={`Edit task: ${title}`}>
          ✏️ Edit
        </button>
        <button onClick={() => onDelete(id)} aria-label={`Delete task: ${title}`}>
          🗑 Delete
        </button>
      </div>
    </div>
  )
}

export default TaskItem
