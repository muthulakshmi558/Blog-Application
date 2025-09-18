// frontend/src/pages/Blog.jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../utils/api'

function Blog({ user }) {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/blog_posts/')
        setPosts(response.data.results || [])
      } catch (error) {
        console.error('Error fetching posts:', error)
        setPosts([])
      }
    }
    fetchPosts()
  }, [])

  const handleDelete = async (id) => {
    try {
      await api.delete(`/blog_posts/${id}/`)
      setPosts(posts.filter(post => post.id !== id))
    } catch (error) {
      console.error('Error deleting post:', error)
      alert('Failed to delete post. Please ensure you are logged in.')
    }
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center animate-fade-in-down bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        Blog Posts
      </h1>
      {posts.length === 0 && (
        <p className="text-gray-600 text-center text-xl">
          No posts available. {user ? 'Create a new post!' : 'Please log in to create posts.'}
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => (
          <div key={post.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 animate-slide-up">
            {post.image && <img src={post.image} alt={post.title} className="w-full h-48 object-cover rounded-lg mb-4" />}
            <h2 className="text-2xl font-semibold mb-3">{post.title}</h2>
            <div className="text-gray-600 mb-3 line-clamp-3" dangerouslySetInnerHTML={{ __html: post.content }} />
            <p className="text-sm text-gray-500 mb-4">By {post.author.username} on {new Date(post.created_at).toLocaleDateString()}</p>
            <Link to={`/post/${post.id}`} className="text-blue-600 hover:text-blue-800 font-semibold mr-4">Read More</Link>
            {user && user.user_id === post.author.id && (
              <div className="mt-4 space-x-4">
                <Link to={`/create?id=${post.id}`} className="text-green-600 hover:text-green-800 font-semibold">Edit</Link>
                <button onClick={() => handleDelete(post.id)} className="text-red-600 hover:text-red-800 font-semibold">Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Blog