// src/components/TaskFilter.jsx
const TaskFilter = ({ filter, setFilter, tasks }) => {
  const getCount = (type) => {
    if (type === 'completed') return tasks.filter(task => task.completed).length
    if (type === 'pending') return tasks.filter(task => !task.completed).length
    return tasks.length
  }

  return (
    <div className="task-filter">
      <button
        className={filter === 'all' ? 'active' : ''}
        onClick={() => setFilter('all')}
      >
        All ({getCount('all')})
      </button>
      <button
        className={filter === 'completed' ? 'active' : ''}
        onClick={() => setFilter('completed')}
      >
        Completed ({getCount('completed')})
      </button>
      <button
        className={filter === 'pending' ? 'active' : ''}
        onClick={() => setFilter('pending')}
      >
        Pending ({getCount('pending')})
      </button>
    </div>
  )
}

export default TaskFilter
