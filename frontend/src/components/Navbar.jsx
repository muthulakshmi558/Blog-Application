// frontend/src/components/Navbar.jsx
import { Link } from 'react-router-dom'

function Navbar({ user, handleLogout }) {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-yellow-200 transition-colors">Blog App</Link>
        <div className="space-x-6">
          <Link to="/" className="hover:text-yellow-200 transition-colors">Home</Link>
          <Link to="/blog" className="hover:text-yellow-200 transition-colors">Blog</Link>
          {user ? (
            <>
              <span className="text-yellow-200">Welcome, {user.username}!</span>
              <Link to="/create" className="bg-green-500 px-3 py-1 rounded hover:bg-green-600 transition-colors">Create Post</Link>
              <Link to="/profile" className="hover:text-yellow-200 transition-colors">Profile</Link>
              <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition-colors">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600 transition-colors">Login</Link>
              <Link to="/register" className="bg-indigo-500 px-3 py-1 rounded hover:bg-indigo-600 transition-colors">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar