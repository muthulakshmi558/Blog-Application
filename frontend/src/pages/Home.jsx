// frontend/src/pages/Home.jsx
function Home() {
  return (
    <div className="container mx-auto p-8 text-center">
      <h1 className="text-5xl font-bold mb-6 animate-fade-in-down bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        Welcome to the Enhanced Blog Application
      </h1>
      <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
        Create, read, update, and delete blog posts with rich formatting, images, and user profiles. Sign up or log in to get started!
      </p>
      <div className="grid md:grid-cols-3 gap-8 mt-12">
        <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow animate-slide-up">
          <h2 className="text-2xl font-semibold mb-2">Rich Text Editor</h2>
          <p className="text-gray-600">Format your posts with bold, italic, lists, and more.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow animate-slide-up">
          <h2 className="text-2xl font-semibold mb-2">User Profiles</h2>
          <p className="text-gray-600">Customize your bio and avatar for a personal touch.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow animate-slide-up">
          <h2 className="text-2xl font-semibold mb-2">Email Notifications</h2>
          <p className="text-gray-600">Get notified when someone comments on your post.</p>
        </div>
      </div>
    </div>
  )
}

export default Home