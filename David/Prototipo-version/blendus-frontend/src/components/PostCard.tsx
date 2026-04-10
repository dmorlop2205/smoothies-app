import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import type { Post, PostComment } from '../lib/api';
import { $isLoggedIn } from '../stores/authStore';
import './PostCard.css';

interface Props {
    post: Post;
    onLikeToggle?: (postId: number, liked: boolean, count: number) => void;
    showComments?: boolean;
}

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function PostCard({ post, onLikeToggle, showComments = false }: Props) {
    const [liked, setLiked] = useState(post.has_liked ?? false);
    const [likesCount, setLikesCount] = useState(post.likes_count ?? 0);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState<PostComment[]>(post.comments ?? []);
    const [commentsOpen, setCommentsOpen] = useState(showComments);
    const [submitting, setSubmitting] = useState(false);
    const [saved, setSaved] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [fetchedComments, setFetchedComments] = useState(false);

    useEffect(() => {
        if (commentsOpen && !fetchedComments && comments.length === 0 && post.comments_count > 0) {
            api.getComments(post.id)
                .then(res => {
                    setComments(res);
                    setFetchedComments(true);
                })
                .catch(console.error);
        }
    }, [commentsOpen, fetchedComments, comments.length, post.comments_count, post.id]);

    const handleLike = async () => {
        if (!$isLoggedIn.get()) { window.location.href = '/login'; return; }
        try {
            const res = await api.likePost(post.id);
            setLiked(res.liked);
            setLikesCount(res.count);
            onLikeToggle?.(post.id, res.liked, res.count);
        } catch { }
    };

    const handleComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!comment.trim()) return;
        if (!$isLoggedIn.get()) { window.location.href = '/login'; return; }
        setSubmitting(true);
        try {
            const newComment = await api.createComment(post.id, comment);
            setComments((prev: PostComment[]) => [...prev, newComment]);
            setComment('');
        } catch { } finally {
            setSubmitting(false);
        }
    };

    // Nico's API v2: image_url is a direct string, author is the user
    const imageUrl = post.image_url || '/assets/smoothie.avif';
    const authorName = post.author?.name ?? 'Unknown';
    const initials = authorName.split(' ').map(n => n[0]).join('').slice(0, 2);

    return (
        <section className="post">
            <div className="post-header">
                <a href={`/profile`} className="post-user" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="circle" style={{
                        background: 'var(--gradient-profile, linear-gradient(135deg,#00D492,#9AE600))',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'white', fontWeight: 'bold', fontSize: '1rem'
                    }}>
                        {initials}
                    </div>
                    <div className="user-info">
                        <p className="name">{authorName}</p>
                        <p className="launch-date">{formatDate(post.created_at)}</p>
                    </div>
                </a>

                <div className="post-options">
                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none">
                        <circle cx="7" cy="12" r="1.5" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="12" r="1.5" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="17" cy="12" r="1.5" stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>

            {imageUrl && (
                <a href={`/post/${post.id}`} style={{ display: 'block', textDecoration: 'none' }}>
                    <div className="post-image" style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '550px', borderRadius: '12px', marginTop: '1rem' }} />
                </a>
            )}

            <div className="interactions">
                <div className="like-comment-share">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }} onClick={handleLike}>
                        <svg className="like" width="24px" height="24px" viewBox="0 0 24 24" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd"
                                d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                                stroke={liked ? 'none' : '#364153'} fill={liked ? '#FF2056' : 'none'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {likesCount > 0 && <span style={{ fontSize: '0.88rem', color: '#666' }}>{likesCount}</span>}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }} onClick={() => setCommentsOpen(o => !o)}>
                        <svg className="comment" width="24px" height="24px" viewBox="0 0 32 32" fill="none">
                            <path d="M16 4C9.373 4 4 8.373 4 14c0 3.314 1.657 6.248 4.224 8.12L8 28l6.4-3.2c.53.08 1.06.12 1.6.12 6.627 0 12-4.373 12-10S22.627 4 16 4z"
                                stroke="#364153" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {post.comments_count > 0 && <span style={{ fontSize: '0.88rem', color: '#666' }}>{post.comments_count}</span>}
                    </div>

                    <div style={{ cursor: 'pointer' }} onClick={() => navigator.clipboard?.writeText(window.location.origin)}>
                        <svg className="share" width="24px" height="24px" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#364153">
                            <path d="M686-80q-47.5 0-80.75-33.25T572-194q0-8 5-34L278-403q-16.28 17.34-37.64 27.17Q219-366 194-366q-47.5 0-80.75-33T80-480q0-48 33.25-81T194-594q24 0 45 9.3 21 9.29 37 25.7l301-173q-2-8-3.5-16.5T572-766q0-47.5 33.25-80.75T686-880q47.5 0 80.75 33.25T800-766q0 47.5-33.25 80.75T686-652q-23.27 0-43.64-9Q622-670 606-685L302-516q3 8 4.5 17.5t1.5 18q0 8.5-1 16t-3 15.5l303 173q16-15 36.09-23.5 20.1-8.5 43.07-8.5Q734-308 767-274.75T800-194q0 47.5-33.25 80.75T686-80Z"/>
                        </svg>
                    </div>
                </div>

                <div className="save" style={{ cursor: 'pointer' }} onClick={() => setSaved(!saved)}>
                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd"
                            d="M6.75 6L7.5 5.25H16.5L17.25 6V19.3162L12 16.2051L6.75 19.3162V6ZM8.25 6.75V16.6838L12 14.4615L15.75 16.6838V6.75H8.25Z"
                            fill={saved ? '#101828' : '#364153'}/>
                    </svg>
                </div>
            </div>

            <div className="description">
                <p>
                    <span className="name" style={{ marginRight: 5 }}>{authorName}</span>
                    {expanded || post.description.length <= 100
                        ? post.description
                        : post.description.substring(0, 100) + '...'}
                    {post.description.length > 100 && !expanded && (
                        <span onClick={() => setExpanded(true)} style={{ cursor: 'pointer', color: '#007A55', marginLeft: 4 }}>more</span>
                    )}
                </p>
            </div>

            {post.tags.length > 0 && (
                <div className="hashtags">
                    {post.tags.map(tag => (
                        <span key={tag.id} className="hashtag">#{tag.name}</span>
                    ))}
                </div>
            )}

            {commentsOpen && (
                <div style={{ marginTop: '1rem', borderTop: '1px solid #eee', paddingTop: '1rem', padding: '1rem 1rem 1rem' }}>
                    {comments.map(c => (
                        <div key={c.id} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                            <div style={{
                                width: 28, height: 28, borderRadius: '50%', background: '#007A55',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '.7rem', fontWeight: 700, color: 'white', flexShrink: 0
                            }}>{c.author?.name?.[0] ?? '?'}</div>
                            <div>
                                <strong style={{ fontSize: '0.88rem' }}>{c.author?.name}</strong>
                                <span style={{ fontSize: '0.88rem', color: '#666', marginLeft: 6 }}>{c.body}</span>
                            </div>
                        </div>
                    ))}
                    <form onSubmit={handleComment} style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                        <input
                            style={{ flex: 1, padding: '8px 12px', border: '1px solid #ddd', borderRadius: '15px', outline: 'none' }}
                            placeholder="Add a comment..."
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                            disabled={submitting}
                        />
                        <button type="submit" disabled={submitting || !comment.trim()}
                            style={{ background: 'none', border: 'none', color: '#007A55', fontWeight: 'bold', cursor: 'pointer' }}>
                            Post
                        </button>
                    </form>
                </div>
            )}
        </section>
    );
}
