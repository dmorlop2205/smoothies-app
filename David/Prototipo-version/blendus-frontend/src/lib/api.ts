// Central API client for the BlendUs app — aligned to Nico's API v2
const API_URL = import.meta.env.PUBLIC_API_URL ?? 'http://localhost:8000';

function getToken(): string | null {
    if (typeof localStorage === 'undefined') return null;
    return localStorage.getItem('blendus_token');
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const token = getToken();
    const headers: HeadersInit = {
        Accept: 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };

    // Only set Content-Type for non-FormData requests
    if (!(options.body instanceof FormData)) {
        (headers as Record<string, string>)['Content-Type'] = 'application/json';
    }

    const res = await fetch(`${API_URL}/api${path}`, { ...options, headers });

    if (!res.ok) {
        const err = await res.json().catch(() => ({ message: res.statusText }));
        throw new Error(err.message ?? 'API Error');
    }

    if (res.status === 204) return undefined as T;
    return res.json();
}

export const api = {
    // Auth — routes: POST /api/auth/register, /api/auth/login, /api/auth/logout
    register: (data: { name: string; username: string; email: string; password: string; password_confirmation: string }) =>
        request<{ user: User; token: string }>('/auth/register', { method: 'POST', body: JSON.stringify(data) }),

    login: (email: string, password: string) =>
        request<{ user: User; token: string }>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),

    logout: () =>
        request<void>('/auth/logout', { method: 'POST' }),

    // Posts — GET /api/posts, POST /api/posts, PUT /api/posts/{id}, DELETE /api/posts/{id}
    getPosts: (params?: { tag?: string; page?: number; per_page?: number }) => {
        const qs = new URLSearchParams();
        if (params?.tag) qs.set('tag', params.tag);
        if (params?.page) qs.set('page', String(params.page));
        if (params?.per_page) qs.set('per_page', String(params.per_page));
        return request<PaginatedResponse<Post>>(`/posts?${qs.toString()}`);
    },

    getPost: (id: number) =>
        request<{data: Post}>(`/posts/${id}`).then(res => res.data),

    createPost: (data: FormData) =>
        request<{data: Post}>('/posts', { method: 'POST', body: data }).then(res => res.data),

    updatePost: (id: number, data: FormData) =>
        request<{data: Post}>(`/posts/${id}`, { method: 'POST', body: data, headers: { 'X-HTTP-Method-Override': 'PUT' } }).then(res => res.data),

    deletePost: (id: number) =>
        request<void>(`/posts/${id}`, { method: 'DELETE' }),

    // Likes — POST /api/likes  (body: { likeable_type, likeable_id })
    likePost: (postId: number) =>
        request<{ liked: boolean; count: number }>('/likes', { method: 'POST', body: JSON.stringify({ likeable_type: 'App\\Models\\Post', likeable_id: postId }) }),

    // Comments
    getComments: (postId: number) =>
        request<{data: PostComment[]}>(`/posts/${postId}/comments`).then(res => res.data),

    createComment: (postId: number, body: string) =>
        request<{data: PostComment}>(`/posts/${postId}/comments`, { method: 'POST', body: JSON.stringify({ body }) }).then(res => res.data),

    deleteComment: (postId: number, commentId: number) =>
        request<void>(`/posts/${postId}/comments/${commentId}`, { method: 'DELETE' }),

    // Tags
    getTags: () =>
        request<{data: Tag[]}>('/tags').then(res => res.data),

    getPostsByTag: (tagSlug: string, page = 1) =>
        request<PaginatedResponse<Post>>(`/tags/${tagSlug}/posts?page=${page}`),

    // Users
    getUser: (id: number) =>
        request<{data: User}>(`/users/${id}`).then(res => res.data),

    followUser: (id: number) =>
        request<void>(`/users/${id}/follow`, { method: 'POST' }),

    unfollowUser: (id: number) =>
        request<void>(`/users/${id}/follow`, { method: 'DELETE' }),

    getSuggestedUsers: () =>
        request<User[]>('/users/suggested'),
};

// ────────── Types (aligned to Nico's API Resources) ──────────

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    posts_count?: number;
}

export interface Ingredient {
    name: string;
    quantity: number;
    unit: string;
}

export interface Tag {
    id: number;
    name: string;
    slug: string;
}

export interface PostComment {
    id: number;
    post_id: number;
    body: string;
    author: User;
    created_at: string;
}

export interface Post {
    id: number;
    title: string;
    description: string;
    preparation_steps: string;
    image_url: string | null;
    created_at: string;
    author: User;
    ingredients: Ingredient[];
    tags: Tag[];
    likes_count: number;
    comments_count: number;
    has_liked: boolean;
    comments?: PostComment[];
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: {
        current_page: number;
        last_page: number;
        total: number;
    };
}
