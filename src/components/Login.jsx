// src/components/Login.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    if (username.trim()) {
      localStorage.setItem('username', username.trim())
      navigate('/dashboard')
    }
  }

  return (
    <div className="login-page">
      <form className="login-box" onSubmit={handleLogin} autoComplete="off">
        <h2>🔐 Task Tracker Login</h2>

        <label htmlFor="username" className="visually-hidden">Username</label>
        <input
          id="username"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <button type="submit">Continue ➡</button>
      </form>
    </div>
  )
}

export default Login
