import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import type { Post } from '../lib/api';
import PostCard from './PostCard';

interface Props {
    postId: number;
}

export default function PostDetails({ postId }: Props) {
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        api.getPost(postId)
            .then(p => setPost(p))
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, [postId]);

    if (loading) return (
        <div className="loading-spinner">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#00BC7D" strokeWidth="2" strokeDasharray="50" strokeDashoffset="20">
                    <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite" />
                </circle>
            </svg>
        </div>
    );

    if (error || !post) return (
        <div className="empty-state">
            <p>Post not found 🍹</p>
            <a href="/" className="btn" style={{ display: 'inline-block', marginTop: '1rem' }}>Back to feed</a>
        </div>
    );

    return <PostCard post={post} showComments={true} />;
}
