// frontend/src/pages/CreatePost.jsx
import { useState, useEffect } from 'react'
import api from '../utils/api'
import { useNavigate, useLocation } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

function CreatePost({ user }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const id = params.get('id')
    if (id) {
      api.get(`/blog_posts/${id}/`)
        .then(response => {
          setTitle(response.data.title)
          setContent(response.data.content)
        })
        .catch(error => {
          console.error('Error fetching post:', error)
          alert('Failed to load post. Please try again.')
        })
    }
  }, [location])

  const handleImageUpload = (e) => {
    setImage(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('content', content)
      if (image) {
        formData.append('image', image)
      }

      if (location.search.includes('id')) {
        const id = new URLSearchParams(location.search).get('id')
        await api.put(`/blog_posts/${id}/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      } else {
        await api.post('/blog_posts/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      }
      setTitle('')
      setContent('')
      setImage(null)
      navigate('/blog')
    } catch (error) {
      console.error('Error saving post:', error)
      if (error.response?.status === 403) {
        alert('You are not authorized to update this post. Only the post creator can edit it.')
      } else if (error.response?.status === 401) {
        alert('Please log in to save the post.')
        navigate('/login')
      } else {
        alert('Failed to save post: ' + (error.response?.data?.detail || 'Unknown error'))
      }
    }
  }

  if (!user) return <div className="container mx-auto p-8">Please log in to create a post.</div>

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center animate-fade-in-down">
        {location.search.includes('id') ? 'Edit Post' : 'Create Post'}
      </h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-xl">
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Description</label>
          <ReactQuill
            value={content}
            onChange={setContent}
            className="bg-white"
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['link', 'image'],
                ['clean'],
              ],
            }}
            theme="snow"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
          Save Post
        </button>
      </form>
    </div>
  )
}

export default CreatePost