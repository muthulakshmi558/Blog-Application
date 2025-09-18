// frontend/src/pages/Profile.jsx
import { useState, useEffect } from 'react'
import api from '../utils/api'

function Profile({ user, setUser }) {
  const [profile, setProfile] = useState({ id: null, bio: '', avatar: null })

  useEffect(() => {
    if (user) {
      console.log('Fetching profile for user:', user.username)
      api.get('/profiles/')
        .then(response => {
          console.log('GET /profiles/ response:', response.data)
          if (response.data.length > 0) {
            setProfile({
              id: response.data[0].id,
              bio: response.data[0].bio || '',
              avatar: response.data[0].avatar,
            })
          } else {
            console.log('No profile found, creating new profile...')
            api.post('/profiles/', {})
              .then(response => {
                console.log('POST /profiles/ response:', response.data)
                setProfile({
                  id: response.data.id,
                  bio: response.data.bio || '',
                  avatar: response.data.avatar,
                })
              })
              .catch(error => {
                console.error('Error creating profile:', error.response?.data || error)
                alert('Failed to create profile: ' + (error.response?.data?.detail || 'Unknown error'))
              })
          }
        })
        .catch(error => {
          console.error('Error fetching profile:', error.response?.data || error)
          alert('Failed to fetch profile: ' + (error.response?.data?.detail || 'Unknown error'))
        })
    }
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!profile.id) {
      console.error('Cannot update profile: profile.id is null')
      alert('Profile not loaded. Please try again.')
      return
    }
    console.log('Updating profile with ID:', profile.id)
    try {
      const formData = new FormData()
      formData.append('bio', profile.bio)
      if (profile.avatar && profile.avatar instanceof File) {
        formData.append('avatar', profile.avatar)
      }
      const response = await api.put(`/profiles/${profile.id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log('PUT /profiles/ response:', response.data)
      alert('Profile updated!')
      const getResponse = await api.get('/profiles/')
      console.log('GET /profiles/ after update:', getResponse.data)
      if (getResponse.data.length > 0) {
        setProfile({
          id: getResponse.data[0].id,
          bio: getResponse.data[0].bio || '',
          avatar: getResponse.data[0].avatar,
        })
      }
    } catch (error) {
      console.error('Profile update error:', error.response?.data || error)
      alert('Failed to update profile: ' + (error.response?.data?.detail || 'Unknown error'))
    }
  }

  if (!user) return <div className="container mx-auto p-8">Please log in to view profile.</div>

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <h1 className="text-4xl font-bold mb-8 text-center animate-fade-in-down">User Profile</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-xl">
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Bio</label>
          <textarea
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Tell us about yourself..."
          ></textarea>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Avatar</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfile({ ...profile, avatar: e.target.files[0] })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
          Update Profile
        </button>
      </form>
      {profile.avatar && typeof profile.avatar === 'string' && (
        <div className="mt-8 text-center">
          <img src={profile.avatar} alt="Avatar" className="w-32 h-32 rounded-full mx-auto shadow-lg" />
        </div>
      )}
    </div>
  )
}

export default Profile