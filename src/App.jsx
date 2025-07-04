import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import TaskList from './components/TaskList'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<TaskList />} />
    </Routes>
  )
}

export default App
