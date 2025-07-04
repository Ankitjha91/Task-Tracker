// src/utils/localStorage.js

// Safely load tasks from localStorage
export const loadTasks = () => {
  try {
    const data = localStorage.getItem('tasks');
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('❌ Failed to parse tasks from localStorage:', err);
    localStorage.removeItem('tasks'); // Remove corrupted data
    return [];
  }
};

// Save tasks to localStorage
export const saveTasks = (tasks) => {
  try {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } catch (err) {
    console.error('❌ Failed to save tasks to localStorage:', err);
  }
};
