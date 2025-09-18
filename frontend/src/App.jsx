// frontend/src/App.jsx
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import api from './utils/api'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Login from './pages/Login'
import Register from './pages/Register'
import CreatePost from './pages/CreatePost'
import PostDetail from './pages/PostDetail'
import Profile from './pages/Profile'

function App() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      api.get('/profiles/')
        .then(response => {
          if (response.data.length > 0) {
            setUser({ user_id: response.data[0].user.id, username: response.data[0].user.username })
          } else {
            localStorage.removeItem('token')
          }
        })
        .catch(() => {
          localStorage.removeItem('token')
          setUser(null)
        })
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog user={user} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/create" element={<CreatePost user={user} />} />
        <Route path="/post/:id" element={<PostDetail user={user} />} />
        <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
      </Routes>
    </div>
  )
}

export default App