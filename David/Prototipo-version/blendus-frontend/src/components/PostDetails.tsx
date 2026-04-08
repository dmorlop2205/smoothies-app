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

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', paddingBottom: '2rem' }}>
            <PostCard post={post} showComments={true} />

            <div className="recipe-details" style={{ 
                marginTop: '1.5rem', 
                background: 'white', 
                borderRadius: '20px', 
                padding: '1.5rem',
                border: '1px solid var(--gray-100)'
            }}>
                <h3 style={{ marginBottom: '1rem', color: 'var(--gray-900)' }}>Ingredients</h3>
                {post.ingredients && post.ingredients.length > 0 ? (
                    <ul style={{ listStyleType: 'none', padding: 0, marginBottom: '2rem' }}>
                        {post.ingredients.map((ing, idx) => (
                            <li key={idx} style={{ 
                                padding: '0.75rem 0', 
                                borderBottom: '1px solid var(--gray-100)',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <span style={{ fontWeight: 500, color: 'var(--gray-700)' }}>{ing.name}</span>
                                <span style={{ color: 'var(--emerald-600)', fontWeight: 'bold' }}>
                                    {ing.quantity} {ing.unit === 'piece' ? 'pcs' : ing.unit}
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p style={{ color: 'var(--gray-500)', marginBottom: '2rem' }}>No ingredients listed.</p>
                )}

                <h3 style={{ marginBottom: '1rem', color: 'var(--gray-900)' }}>Preparation Steps</h3>
                {post.preparation_steps ? (
                    <div style={{ 
                        whiteSpace: 'pre-wrap', 
                        color: 'var(--gray-700)', 
                        lineHeight: '1.6' 
                    }}>
                        {post.preparation_steps}
                    </div>
                ) : (
                    <p style={{ color: 'var(--gray-500)' }}>No preparation steps listed.</p>
                )}
            </div>
        </div>
    );
}
