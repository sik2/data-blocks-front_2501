export const mockPosts = [
    {
        id: '1',
        title: 'Node.js 서버 구축하기',
        content: 'Express를 사용하여 RESTful API 서버를 구축하는 방법을 알아봅시다...',
        tags: ['Node.js', 'Express', 'Backend', 'Server', 'API'],
        thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg',
        createdAt: '2024-03-15T09:00:00.000Z',
        userId: 'user1',
        userEmail: 'user1@example.com',
    },
    {
        id: '2',
        title: 'MongoDB 데이터 모델링 가이드',
        content: 'NoSQL 데이터베이스인 MongoDB의 효율적인 데이터 모델링 방법을 소개합니다...',
        tags: ['MongoDB', 'Database', 'NoSQL', 'Backend'],
        thumbnail: 'https://webimages.mongodb.com/_com_assets/cms/mongodb_logo1-76twgcu2dm.png',
        createdAt: '2024-03-14T15:00:00.000Z',
        userId: 'user2',
        userEmail: 'user2@example.com',
    },
    {
        id: '3',
        title: 'Docker 컨테이너 기초',
        content: 'Docker를 사용한 애플리케이션 컨테이너화 방법을 설명합니다...',
        tags: ['Docker', 'DevOps', 'Container', 'Backend'],
        thumbnail: 'https://www.docker.com/wp-content/uploads/2022/03/vertical-logo-monochromatic.png',
        createdAt: '2024-03-13T10:00:00.000Z',
        userId: 'user1',
        userEmail: 'user1@example.com',
    },
    {
        id: '4',
        title: 'Spring Boot JPA 활용하기',
        content: 'Spring Boot에서 JPA를 사용한 데이터베이스 연동 방법을 알아봅시다...',
        tags: ['Spring', 'Java', 'JPA', 'Backend'],
        thumbnail: 'https://spring.io/img/spring.svg',
        createdAt: '2024-03-12T14:00:00.000Z',
        userId: 'user2',
        userEmail: 'user2@example.com',
    },
    {
        id: '5',
        title: 'AWS Lambda 서버리스 아키텍처',
        content: 'AWS Lambda를 활용한 서버리스 애플리케이션 구축 방법을 알아봅니다...',
        tags: ['AWS', 'Lambda', 'Serverless', 'Backend'],
        thumbnail:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Amazon_Lambda_architecture_logo.svg/1200px-Amazon_Lambda_architecture_logo.svg.png',
        createdAt: '2024-03-11T09:00:00.000Z',
        userId: 'user1',
        userEmail: 'user1@example.com',
    },
    {
        id: '6',
        title: 'GraphQL API 설계 가이드',
        content: 'GraphQL을 사용한 효율적인 API 설계 방법 ���범 사례를 소개합니다...',
        tags: ['GraphQL', 'API', 'Backend', 'Server'],
        thumbnail:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/1200px-GraphQL_Logo.svg.png',
        createdAt: '2024-03-10T15:00:00.000Z',
        userId: 'user2',
        userEmail: 'user2@example.com',
    },
    {
        id: '7',
        title: 'Kubernetes 클러스터 관리',
        content: 'Kubernetes를 사용한 컨테이너 오케스트레이션 관리 방법을 설명합니다...',
        tags: ['Kubernetes', 'DevOps', 'Container', 'Backend'],
        thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Kubernetes_logo_without_workmark.svg',
        createdAt: '2024-03-09T10:00:00.000Z',
        userId: 'user1',
        userEmail: 'user1@example.com',
    },
    {
        id: '8',
        title: 'Redis 클러스터 구축하기',
        content: 'Redis 클러스터를 구축하고 고가용성을 확보하는 방법을 알아봅니다...',
        tags: ['Redis', 'Database', 'Cache', 'Backend'],
        thumbnail: 'https://cdn.icon-icons.com/icons2/2415/PNG/512/redis_original_logo_icon_146368.png',
        createdAt: '2024-03-08T14:00:00.000Z',
        userId: 'user2',
        userEmail: 'user2@example.com',
    },
]

export const mockComments = [
    {
        id: 'comment1',
        postId: '1',
        content: '좋은 글 감사합니다!',
        userId: 'user2',
        userEmail: 'user2@example.com',
        createdAt: '2024-03-15T10:00:00.000Z',
    },
    {
        id: 'comment2',
        postId: '1',
        content: '매우 유익한 내용이네요.',
        userId: 'user3',
        userEmail: 'user3@example.com',
        createdAt: '2024-03-15T11:00:00.000Z',
    },
]

export const mockUsers = {
    user1: {
        id: 'user1',
        email: 'user1@example.com',
        password: 'password123',
        profileImage: 'https://api.dicebear.com/7.x/bottts/svg?seed=user1',
        nickname: 'Backend Developer',
    },
    user2: {
        id: 'user2',
        email: 'user2@example.com',
        password: 'password123',
        profileImage: 'https://api.dicebear.com/7.x/bottts/svg?seed=user2',
        nickname: 'System Architect',
    },
}

// 현재 로그인한 사용자 정보를 관리하는 간단한 상태 관리
let currentUser = {
    id: 'user1',
    email: 'user1@example.com',
    password: 'password123',
    profileImage: 'https://api.dicebear.com/7.x/bottts/svg?seed=user1',
    nickname: 'Backend Developer',
}

export const mockAuth = {
    signIn: (email, password) => {
        const user = Object.values(mockUsers).find((u) => u.email === email && u.password === password)
        if (user) {
            currentUser = user
            return Promise.resolve(user)
        }
        return Promise.reject(new Error('Invalid credentials'))
    },
    signOut: () => {
        currentUser = null
        return Promise.resolve()
    },
    getCurrentUser: () => currentUser,
    register: (email, password) => {
        const newUserId = `user${Object.keys(mockUsers).length + 1}`
        const newUser = {
            id: newUserId,
            email,
            password,
        }
        mockUsers[newUserId] = newUser
        return Promise.resolve(newUser)
    },
}

export const mockChats = [
    {
        id: 'msg1',
        userId: 'user2',
        content: '안녕하세요! 백엔드 개발에 관심이 있으신가요?',
        createdAt: '2024-03-15T10:00:00.000Z',
    },
    {
        id: 'msg2',
        userId: 'user1',
        content: '네! JAVA와 Spring Boot를 공부하고 있습니다.',
        createdAt: '2024-03-15T10:01:00.000Z',
    },
    {
        id: 'msg3',
        userId: 'user2',
        content: '좋은 선택이에요! 저도 Spring Boot로 개발하고 있습니다. 특히 JPA가 정말 편리하더라구요.',
        createdAt: '2024-03-15T10:02:00.000Z',
    },
    {
        id: 'msg4',
        userId: 'user1',
        content: 'JPA 학습 중인데 연관관계 매핑이 조금 어렵네요 😅',
        createdAt: '2024-03-15T10:03:00.000Z',
    },
    {
        id: 'msg5',
        userId: 'user2',
        content: '처음에는 다들 그렇죠! 차근차근 학습하다 보면 금방 익숙해지실 거예요.',
        createdAt: '2024-03-15T10:04:00.000Z',
    },
]
