// src/components/Login.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('')
  const navigate = useNavigate()

  const handleLogin = () => {
    if (username.trim()) {
      localStorage.setItem('username', username)
      navigate('/dashboard')
    }
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>🔐 Task Tracker Login</h2>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleLogin}>Continue ➡</button>
      </div>
    </div>
  )
}

export default Login
