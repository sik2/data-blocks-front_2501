import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ReactLoading from 'react-loading'
import { mockPosts, mockUsers } from '../mocks/data'

function Home() {
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState(null)
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [allTags, setAllTags] = useState([])
    const [selectedTag, setSelectedTag] = useState(null)
    const [searchLoading, setSearchLoading] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setItems(mockPosts)
            const tags = mockPosts.reduce((acc, item) => {
                if (item.tags && Array.isArray(item.tags)) {
                    return [...acc, ...item.tags]
                }
                return acc
            }, [])
            const uniqueTags = [...new Set(tags)]
            setAllTags(uniqueTags)
            setLoading(false)
        }, 1000)

        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        if (!searchTerm.trim()) {
            setSearchResults(null)
            return
        }

        const startSearchTimer = setTimeout(() => {
            setSearchLoading(true)

            const searchTimer = setTimeout(() => {
                const searchTermLower = searchTerm.toLowerCase()
                const results = items.filter((item) => {
                    const titleMatch = item.title?.toLowerCase().includes(searchTermLower)
                    const contentMatch = item.content?.toLowerCase().includes(searchTermLower)
                    const tagMatch = item.tags?.some((tag) => tag.toLowerCase().includes(searchTermLower))
                    return titleMatch || contentMatch || tagMatch
                })

                setSearchResults(results)
                setSearchLoading(false)
            }, 5000)

            return () => clearTimeout(searchTimer)
        }, 1000)

        return () => clearTimeout(startSearchTimer)
    }, [searchTerm, items])

    const filteredItems =
        searchResults !== null
            ? searchResults.filter((item) => !selectedTag || (item.tags && item.tags.includes(selectedTag)))
            : selectedTag
            ? items.filter((item) => item.tags && item.tags.includes(selectedTag))
            : items

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <ReactLoading type="spin" color="#4F46E5" height={50} width={50} className="mx-auto mb-4" />
                    <p className="text-gray-600">로딩중...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-120px)]">
            <div className="flex flex-wrap gap-2 mb-6">
                <button
                    onClick={() => setSelectedTag(null)}
                    className={`px-4 py-2 rounded-full border ${
                        selectedTag === null
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'border-gray-300 hover:bg-gray-100'
                    }`}
                >
                    All
                </button>
                {allTags.map((tag) => (
                    <button
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className={`px-4 py-2 rounded-full border ${
                            selectedTag === tag
                                ? 'bg-indigo-600 text-white border-indigo-600'
                                : 'border-gray-300 hover:bg-gray-100'
                        }`}
                    >
                        #{tag}
                    </button>
                ))}
            </div>

            <div className="mb-8">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="제목, 내용, 태그로 검색..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {searchLoading && (
                <div className="flex justify-center items-center py-20">
                    <div className="text-center">
                        <ReactLoading type="spin" color="#4F46E5" height={150} width={150} className="mx-auto mb-4" />
                        <p className="text-2xl text-gray-700 font-semibold">검색 중...</p>
                    </div>
                </div>
            )}

            {searchResults !== null && searchResults.length === 0 && (
                <div className="text-center text-gray-500 my-8">검색 결과가 없습니다.</div>
            )}

            {!searchLoading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredItems.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden h-[280px] flex flex-col"
                        >
                            <Link to={`/post/${item.id}`}>
                                <div className="relative pb-[56.25%] bg-white p-4">
                                    <img
                                        src={item.thumbnail}
                                        alt={item.title}
                                        className="absolute inset-0 w-full h-full object-contain p-4"
                                    />
                                </div>
                                <div className="p-4 flex-1 flex flex-col">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <img
                                            src={mockUsers[item.userId].profileImage}
                                            alt="profile"
                                            className="w-6 h-6 rounded-full flex-shrink-0"
                                        />
                                        <span className="text-sm text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">
                                            {mockUsers[item.userId].nickname}
                                        </span>
                                    </div>
                                    <h3 className="font-semibold mb-2 text-sm line-clamp-2 flex-1">{item.title}</h3>
                                    <div className="flex flex-wrap gap-1 mb-2">
                                        {item.tags?.map((tag, index) => (
                                            <span key={index} className="text-xs text-indigo-600">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Home
