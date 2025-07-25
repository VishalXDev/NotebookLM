import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">NotebookLM Clone</h1>
      <p className="text-gray-600 mb-4">Upload your PDF and chat with it using AI.</p>
      <Link
        to="/chat"
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
      >
        Go to App
      </Link>
    </div>
  )
}

export default Home
