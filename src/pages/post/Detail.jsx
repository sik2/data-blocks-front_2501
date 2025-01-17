import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import ReactLoading from 'react-loading'
import { toast } from 'react-toastify'
import { mockPosts, mockComments, mockAuth } from '../../mocks/data'

function Detail() {
    const { id } = useParams()
    const [post, setPost] = useState(null)
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')
    const [loading, setLoading] = useState(true)
    const [commentLoading, setCommentLoading] = useState(false)
    const navigate = useNavigate()
    const [error, setError] = useState(null)

    const fetchComments = () => {
        const postComments = mockComments.filter((comment) => comment.postId === id)
        setComments(postComments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            const foundPost = mockPosts.find((post) => post.id === id)
            if (!foundPost) {
                setError('게시글을 찾을 수 없습니다.')
                return
            }
            setPost(foundPost)
            fetchComments()
            setLoading(false)
        }, 1000)

        return () => clearTimeout(timer)
    }, [id])

    const handleCommentSubmit = async (e) => {
        e.preventDefault()

        const currentUser = mockAuth.getCurrentUser()
        if (!currentUser) {
            toast.error('댓글을 작성하려면 로그인이 필요합니다.')
            return
        }

        if (!newComment.trim()) {
            toast.error('댓글 내용을 입력해주세요.')
            return
        }

        setCommentLoading(true)
        try {
            const newCommentObj = {
                id: `comment${mockComments.length + 1}`,
                postId: id,
                content: newComment.trim(),
                userId: currentUser.id,
                userEmail: currentUser.email,
                createdAt: new Date().toISOString(),
            }
            mockComments.push(newCommentObj)
            setNewComment('')
            fetchComments()
            toast.success('댓글이 등록되었습니다.')
        } catch (error) {
            toast.error('댓글 등록에 실패했습니다.')
        } finally {
            setCommentLoading(false)
        }
    }

    const handleCommentDelete = (commentId) => {
        if (!window.confirm('댓글을 삭제하시겠습니까?')) {
            return
        }

        try {
            const commentIndex = mockComments.findIndex((c) => c.id === commentId)
            if (commentIndex !== -1) {
                mockComments.splice(commentIndex, 1)
                fetchComments()
                toast.success('댓글이 삭제되었습니다.')
            }
        } catch (error) {
            toast.error('댓글 삭제에 실패했습니다.')
        }
    }

    const handleDelete = () => {
        if (!window.confirm('게시글을 삭제하시겠습니까?')) {
            return
        }

        try {
            setLoading(true)
            const postIndex = mockPosts.findIndex((p) => p.id === id)
            if (postIndex !== -1) {
                mockPosts.splice(postIndex, 1)
                toast.success('게시글이 삭제되었습니다.')
                navigate('/')
            }
        } catch (error) {
            toast.error('게시글 삭제에 실패했습니다.')
        } finally {
            setLoading(false)
        }
    }

    if (loading)
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <ReactLoading type="spin" color="#4F46E5" height={50} width={50} className="mx-auto mb-4" />
                    <p className="text-gray-600">로딩중...</p>
                </div>
            </div>
        )

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-bold">{post.title}</h1>
                </div>
                {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200 cursor-pointer"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
                <hr className="border-t border-gray-200 my-4" />
            </div>

            <div className="bg-white rounded-lg p-6 mb-8 h-[400px] overflow-y-auto">
                <div className="prose max-w-none">{post.content}</div>
            </div>

            <div className="flex justify-end gap-4 mb-8">
                <Link to="/post/list" className="px-4 py-2 text-white bg-indigo-500 rounded hover:bg-indigo-600">
                    목록
                </Link>
                <Link to={`/post/edit/${id}`} className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">
                    수정
                </Link>
                <button onClick={handleDelete} className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600">
                    삭제
                </button>
            </div>

            <div className="bg-white rounded-lg p-6 h-[300px] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">댓글 ({comments.length})</h2>
                </div>

                <form onSubmit={handleCommentSubmit} className="mb-6">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="댓글을 입력하세요"
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={commentLoading}
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                            disabled={commentLoading}
                        >
                            {commentLoading ? '등록 중...' : '등록'}
                        </button>
                    </div>
                </form>

                <div className="space-y-4">
                    {comments.map((comment) => (
                        <div key={comment.id} className="border-b pb-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-medium">{comment.userEmail?.split('@')[0]}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-500">
                                        {comment.createdAt?.toDate().toLocaleDateString()}
                                    </span>
                                    {mockAuth.getCurrentUser()?.id === comment.userId && (
                                        <button
                                            onClick={() => handleCommentDelete(comment.id)}
                                            className="text-red-500 hover:text-red-600 text-sm"
                                        >
                                            삭제
                                        </button>
                                    )}
                                </div>
                            </div>
                            <p className="text-gray-700">{comment.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Detail
