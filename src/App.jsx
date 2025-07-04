// src/App.jsx
import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import TaskList from './components/TaskList'
import './styles/App.css'

const App = () => {
  // Load dark mode from localStorage
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true'
  })

  // Toggle class on <body> and persist state
  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : ''
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 role="heading" aria-level="1">
          📝 Task Tracker
        </h1>
        <button
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle dark/light mode"
        >
          {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>
      </header>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<TaskList />} />
      </Routes>
    </div>
  )
}

export default App
