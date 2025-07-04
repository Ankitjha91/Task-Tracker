// src/components/TaskFilter.jsx

const TaskFilter = ({ filter, setFilter, tasks }) => {
  const getCount = (type) => {
    switch (type) {
      case 'completed':
        return tasks.filter((task) => task.completed).length
      case 'pending':
        return tasks.filter((task) => !task.completed).length
      default:
        return tasks.length
    }
  }

  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Completed', value: 'completed' },
    { label: 'Pending', value: 'pending' },
  ]

  return (
    <nav className="task-filter" role="navigation" aria-label="Task Filter">
      {filters.map(({ label, value }) => (
        <button
          key={value}
          type="button"
          className={`filter-btn ${filter === value ? 'active' : ''}`}
          onClick={() => setFilter(value)}
          aria-pressed={filter === value}
        >
          {label} ({getCount(value)})
        </button>
      ))}
    </nav>
  )
}

export default TaskFilter
