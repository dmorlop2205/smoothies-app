// Central API client for the BlendUs app
const API_URL = import.meta.env.PUBLIC_API_URL ?? 'http://localhost:8000';

function getToken(): string | null {
    if (typeof localStorage === 'undefined') return null;
    return localStorage.getItem('blendus_token');
}

async function request<T>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    const token = getToken();
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const res = await fetch(`${API_URL}/api${path}`, { ...options, headers });

    if (!res.ok) {
        const err = await res.json().catch(() => ({ message: res.statusText }));
        throw new Error(err.message ?? 'API Error');
    }

    return res.json();
}

export const api = {
    // Auth
    register: (data: { name: string; email: string; password: string; password_confirmation: string }) =>
        request<{ user: User; token: string }>('/register', { method: 'POST', body: JSON.stringify(data) }),

    login: (data: { email: string; password: string }) =>
        request<{ user: User; token: string }>('/login', { method: 'POST', body: JSON.stringify(data) }),

    logout: () => request<void>('/logout', { method: 'POST' }),

    me: () => request<User>('/me'),

    // Posts
    getPosts: (params?: { tag?: string; search?: string; page?: number }) => {
        const qs = new URLSearchParams();
        if (params?.tag) qs.set('tag', params.tag);
        if (params?.search) qs.set('search', params.search);
        if (params?.page) qs.set('page', String(params.page));
        return request<PaginatedResponse<Post>>(`/posts?${qs.toString()}`);
    },

    getPost: (id: number) => request<Post>(`/posts/${id}`),

    createPost: (data: {
        title: string;
        description: string;
        preparation_time?: number;
        tags?: number[];
        image_url?: string;
    }) => request<Post>('/posts', { method: 'POST', body: JSON.stringify(data) }),

    likePost: (id: number) =>
        request<{ liked: boolean; likes_count: number }>(`/posts/${id}/like`, { method: 'POST' }),

    // Comments
    getComments: (postId: number) => request<Comment[]>(`/posts/${postId}/comments`),

    createComment: (postId: number, body: string) =>
        request<Comment>(`/posts/${postId}/comments`, { method: 'POST', body: JSON.stringify({ body }) }),

    deleteComment: (commentId: number) =>
        request<void>(`/comments/${commentId}`, { method: 'DELETE' }),

    // Tags
    getTags: () => request<Tag[]>('/tags'),

    // Users
    getUser: (id: number) => request<User>(`/users/${id}`),
    getUserPosts: (id: number) => request<Post[]>(`/users/${id}/posts`),
    getSuggestedUsers: () => request<User[]>('/users/suggested'),
};

// Types
export interface User {
    id: number;
    name: string;
    email: string;
    posts_count?: number;
}

export interface Post {
    id: number;
    user_id: number;
    title: string;
    description: string;
    preparation_time: number | null;
    is_premium: boolean;
    is_liked?: boolean;
    likes_count: number;
    comments_count: number;
    user: User;
    images: Image[];
    tags: Tag[];
    comments?: Comment[];
    created_at: string;
}

export interface Comment {
    id: number;
    post_id: number;
    user_id: number;
    body: string;
    user: User;
    created_at: string;
}

export interface Tag {
    id: number;
    name: string;
    slug: string;
}

export interface Image {
    id: number;
    post_id: number;
    path: string;
    order: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    current_page: number;
    last_page: number;
    total: number;
}
