import { useState } from 'react';
import { api } from '../lib/api';
import type { Post } from '../lib/api';
import { $isLoggedIn } from '../stores/authStore';

interface Props {
    post: Post;
    onLikeToggle?: (postId: number, liked: boolean, count: number) => void;
    showComments?: boolean;
}

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function PostCard({ post, onLikeToggle, showComments = false }: Props) {
    const [liked, setLiked] = useState(post.is_liked ?? false);
    const [likesCount, setLikesCount] = useState(post.likes_count);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(post.comments ?? []);
    const [commentsOpen, setCommentsOpen] = useState(showComments);
    const [submitting, setSubmitting] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleLike = async () => {
        if (!$isLoggedIn.get()) { window.location.href = '/login'; return; }
        try {
            const res = await api.likePost(post.id);
            setLiked(res.liked);
            setLikesCount(res.likes_count);
            onLikeToggle?.(post.id, res.liked, res.likes_count);
        } catch { }
    };

    const handleComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!comment.trim()) return;
        if (!$isLoggedIn.get()) { window.location.href = '/login'; return; }
        setSubmitting(true);
        try {
            const newComment = await api.createComment(post.id, comment);
            setComments(prev => [...prev, newComment]);
            setComment('');
        } catch { } finally {
            setSubmitting(false);
        }
    };

    const imageUrl = post.images?.[0]?.path;
    const initials = post.user.name.split(' ').map(n => n[0]).join('').slice(0, 2);

    return (
        <article className="post-card">
            <div className="post-header">
                <div className="post-user">
                    <a href={`/profile/${post.user.id}`} className="post-avatar" style={{ textDecoration: 'none' }}>
                        {imageUrl ? null : (
                            <div style={{
                                width: 58, height: 58, borderRadius: '50%', background: 'var(--gradient-profile)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '1.2rem', fontWeight: 700, color: 'white', zIndex: 1, position: 'relative'
                            }}>{initials}</div>
                        )}
                    </a>
                    <div>
                        <div className="post-user-name">{post.user.name}</div>
                        <div className="post-date">{formatDate(post.created_at)}</div>
                        {post.preparation_time && (
                            <div className="post-prep">⏱ {post.preparation_time} min</div>
                        )}
                    </div>
                </div>
                <a href={`/post/${post.id}`} className="post-options" title="View post">
                    <svg viewBox="0 0 24 24" fill="none">
                        <circle cx="7" cy="12" r="0.5" stroke="#99A1AF" strokeWidth="2" strokeLinecap="round" />
                        <circle cx="12" cy="12" r="0.5" stroke="#99A1AF" strokeWidth="2" strokeLinecap="round" />
                        <circle cx="17" cy="12" r="0.5" stroke="#99A1AF" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </a>
            </div>

            {imageUrl && (
                <div className="post-image">
                    <img src={imageUrl} alt={post.title} loading="lazy" />
                </div>
            )}

            <div className="post-interactions">
                <div className="post-actions">
                    <button
                        className={`action-btn like-btn${liked ? ' liked' : ''}`}
                        onClick={handleLike}
                        aria-label="Like"
                    >
                        <svg viewBox="0 0 24 24" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                                stroke={liked ? 'none' : '#364153'} fill={liked ? '#FF2056' : 'none'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {likesCount > 0 && <span>{likesCount}</span>}
                    </button>
                    <button className="action-btn comment-btn" onClick={() => setCommentsOpen(o => !o)} aria-label="Comment">
                        <svg viewBox="0 0 32 32" fill="none">
                            <path d="M16 4C9.373 4 4 8.373 4 14c0 3.314 1.657 6.248 4.224 8.12L8 28l6.4-3.2c.53.08 1.06.12 1.6.12 6.627 0 12-4.373 12-10S22.627 4 16 4z"
                                stroke="#364153" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {post.comments_count > 0 && <span>{post.comments_count}</span>}
                    </button>
                    <button className="action-btn share-btn" onClick={() => navigator.clipboard?.writeText(`${window.location.origin}/post/${post.id}`)} aria-label="Share">
                        <svg viewBox="0 0 960 960" fill="#364153" style={{ width: 28, height: 28 }}>
                            <path d="M686-80q-47.5 0-80.75-33.25T572-194q0-8 5-34L278-403q-16.28 17.34-37.64 27.17Q219-366 194-366q-47.5 0-80.75-33T80-480q0-48 33.25-81T194-594q24 0 45 9.3 21 9.29 37 25.7l301-173q-2-8-3.5-16.5T572-766q0-47.5 33.25-80.75T686-880q47.5 0 80.75 33.25T800-766q0 47.5-33.25 80.75T686-652q-23.27 0-43.64-9Q622-670 606-685L302-516q3 8 4.5 17.5t1.5 18q0 8.5-1 16t-3 15.5l303 173q16-15 36.09-23.5 20.1-8.5 43.07-8.5Q734-308 767-274.75T800-194q0 47.5-33.25 80.75T686-80Z" />
                        </svg>
                    </button>
                </div>
                <button className={`save-btn${saved ? ' saved' : ''}`} onClick={() => setSaved(s => !s)} aria-label="Save">
                    <svg viewBox="0 0 24 24" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd"
                            d="M6.75 6L7.5 5.25H16.5L17.25 6V19.3162L12 16.2051L6.75 19.3162V6ZM8.25 6.75V16.6838L12 14.4615L15.75 16.6838V6.75H8.25Z"
                            fill={saved ? '#101828' : '#364153'} />
                    </svg>
                </button>
            </div>

            <div className="post-description">
                <strong>{post.user.name} </strong>{post.description}
            </div>

            {post.tags.length > 0 && (
                <div className="post-hashtags">
                    {post.tags.map(tag => (
                        <span key={tag.id} className="post-hashtag">#{tag.name}</span>
                    ))}
                </div>
            )}

            {commentsOpen && (
                <div className="comments-section">
                    {comments.map(c => (
                        <div className="comment-item" key={c.id}>
                            <div style={{
                                width: 36, height: 36, borderRadius: '50%', background: 'var(--gradient-profile)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '.85rem', fontWeight: 700, color: 'white', flexShrink: 0
                            }}>{c.user.name[0]}</div>
                            <div className="comment-body">
                                <div className="comment-author">{c.user.name}</div>
                                <div className="comment-text">{c.body}</div>
                            </div>
                        </div>
                    ))}
                    <form className="comment-form" onSubmit={handleComment}>
                        <input
                            className="comment-input"
                            placeholder="Add a comment..."
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                            disabled={submitting}
                        />
                        <button type="submit" className="btn" disabled={submitting || !comment.trim()}>
                            {submitting ? '...' : 'Post'}
                        </button>
                    </form>
                </div>
            )}
        </article>
    );
}
