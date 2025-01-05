import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { mockAuth } from '../../mocks/data'
import { toast } from 'react-toastify'

function Nav() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const handleLogout = async () => {
        try {
            setIsLoading(true)
            await mockAuth.signOut()
            navigate('/login')
        } catch (error) {
            toast.error('로그아웃 실패')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <nav className="bg-white shadow-sm w-full">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
                <div className="flex items-center space-x-4">
                    <Link to="/" className="flex items-center space-x-3">
                        <div className="w-10 h-10 relative">
                            <div className="absolute inset-0 bg-purple-700 rounded-r-full"></div>
                            <div className="absolute top-0 left-0 w-5 h-full bg-purple-700"></div>
                            <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
                        </div>
                        <span className="text-blue-900 font-bold text-xl">DATA BLOCKS</span>
                    </Link>
                </div>
                <div className="flex items-center space-x-4">
                    <Link to="/chat">
                        <button className="bg-gray-800 text-white px-4 py-2 rounded">Chat</button>
                    </Link>
                    <Link to="/post/list">
                        <button className="bg-gray-800 text-white px-4 py-2 rounded">List</button>
                    </Link>
                    {mockAuth.getCurrentUser() ? (
                        <button
                            onClick={handleLogout}
                            disabled={isLoading}
                            className="bg-gray-800 text-white px-4 py-2 rounded disabled:opacity-50"
                        >
                            {isLoading ? 'Logging out...' : 'Logout'}
                        </button>
                    ) : (
                        <>
                            <Link to="/login">
                                <button className="bg-gray-800 text-white px-4 py-2 rounded">Login</button>
                            </Link>
                            <Link to="/register">
                                <button className="bg-gray-800 text-white px-4 py-2 rounded">Register</button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Nav
