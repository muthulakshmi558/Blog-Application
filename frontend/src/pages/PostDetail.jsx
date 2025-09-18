// frontend/src/pages/PostDetail.jsx
import { useState, useEffect } from 'react'
import api from '../utils/api'
import { useParams } from 'react-router-dom'

function PostDetail({ user }) {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [comment, setComment] = useState('')

  useEffect(() => {
    api.get(`/blog_posts/${id}/`)
      .then(response => setPost(response.data))
      .catch(error => console.error(error))
  }, [id])

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/comments/', { post: id, content: comment })
      setComment('')
      const response = await api.get(`/blog_posts/${id}/`)
      setPost(response.data)
    } catch (error) {
      console.error(error)
      alert('Failed to add comment')
    }
  }

  if (!post) return <div className="container mx-auto p-8">Loading...</div>

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <article className="bg-white p-8 rounded-xl shadow-xl animate-slide-up">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        {post.image && <img src={post.image} alt={post.title} className="w-full h-64 object-cover rounded-lg mb-6" />}
        <div className="text-gray-800 mb-6 prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
        <p className="text-sm text-gray-500">By {post.author.username} on {new Date(post.created_at).toLocaleDateString()}</p>
      </article>
      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-6">Comments</h2>
        {post.comments.map(comment => (
          <div key={comment.id} className="bg-gray-50 p-6 rounded-lg mb-4 shadow-md">
            <p className="text-gray-800" dangerouslySetInnerHTML={{ __html: comment.content }} />
            <p className="text-sm text-gray-500">By {comment.author.username} on {new Date(comment.created_at).toLocaleDateString()}</p>
          </div>
        ))}
        {user && (
          <form onSubmit={handleCommentSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              rows="4"
              placeholder="Add a comment..."
              required
            ></textarea>
            <button type="submit" className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
              Add Comment
            </button>
          </form>
        )}
      </section>
    </div>
  )
}

export default PostDetail