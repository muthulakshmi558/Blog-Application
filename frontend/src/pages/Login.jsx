// frontend/src/pages/Login.jsx
import { useState } from 'react'
import api from '../utils/api'
import { useNavigate } from 'react-router-dom'

function Login({ setUser }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await api.post('/auth/login/', { username, password })
      localStorage.setItem('token', response.data.token)
      setUser(response.data)
      navigate('/blog')
    } catch (error) {
      console.error('Login error:', error)
      alert('Login failed')
    }
  }

  return (
    <div className="container mx-auto p-8 max-w-md">
      <h1 className="text-4xl font-bold mb-6 text-center animate-fade-in-down">Login</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-xl">
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login