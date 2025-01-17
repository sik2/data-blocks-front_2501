import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import List from './pages/post/List'
import Detail from './pages/post/Detail'
import Create from './pages/post/Create'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Edit from './pages/post/Edit'
import Chat from './pages/Chat'

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/post/list" element={<List />} />
                <Route path="/post/:id" element={<Detail />} />
                <Route path="/post/write" element={<Create />} />
                <Route path="/post/edit/:id" element={<Edit />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="*" element={<NotFound />} /> {/* 404 페이지 추가 */}
            </Routes>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover />
        </Layout>
    )
}

export default App
