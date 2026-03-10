import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import type { Post, Tag } from '../lib/api';
import PostCard from './PostCard';

const FILTER_ICONS: Record<string, string> = {
    all: '/sparks.webp',
    green: '/greensmoothies.png',
    tropical: '/pineaple.webp',
    berry: '/berry.webp',
    protein: '/proteinshake.webp',
    detox: '/leaves.webp',
    dessert: '/ice-cream.webp',
};

export default function Feed() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);
    const [activeTag, setActiveTag] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    useEffect(() => {
        api.getTags().then(setTags).catch(() => { });
    }, []);

    useEffect(() => {
        setLoading(true);
        api.getPosts({ tag: activeTag ?? undefined, page })
            .then(res => {
                setPosts(prev => page === 1 ? res.data : [...prev, ...res.data]);
                setLastPage(res.last_page);
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, [activeTag, page]);

    const handleFilterClick = (slug: string | null) => {
        setActiveTag(slug);
        setPage(1);
        setPosts([]);
    };

    const handleLikeToggle = (postId: number, liked: boolean, count: number) => {
        setPosts(prev => prev.map(p =>
            p.id === postId ? { ...p, is_liked: liked, likes_count: count } : p
        ));
    };

    return (
        <div>
            {/* Stories Bar */}
            <div className="stories-bar">
                <div className="story-you">
                    <div className="story-circle">
                        <svg viewBox="0 0 24 24" fill="none">
                            <line stroke="#009966" strokeLinecap="round" strokeWidth="2" x1="12" x2="12" y1="5" y2="19" />
                            <line stroke="#009966" strokeLinecap="round" strokeWidth="2" x1="5" x2="19" y1="12" y2="12" />
                        </svg>
                    </div>
                    <span className="story-name">You</span>
                </div>
                {[
                    { name: 'John', img: '/user1.jpg' },
                    { name: 'Marie', img: '/user2.jpg' },
                    { name: 'Julia', img: '/user3.jpg' },
                    { name: 'Alex', img: '/Alexelcapo.webp' },
                    { name: 'Robert', img: '/user 4.jpg' },
                    { name: 'James', img: '/user 5.jpg' },
                ].map(u => (
                    <div className="story-item" key={u.name}>
                        <div className="story-circle">
                            <img src={u.img} alt={u.name} />
                        </div>
                        <span className="story-name">{u.name}</span>
                    </div>
                ))}
            </div>

            {/* Filter Bar */}
            <div className="filter-bar" style={{ margin: '0' }}>
                <button
                    className={`filter-pill${activeTag === null ? ' active' : ''}`}
                    onClick={() => handleFilterClick(null)}
                >
                    <img src="/sparks.webp" alt="All" />
                    All
                </button>
                {tags.map(tag => (
                    <button
                        key={tag.id}
                        className={`filter-pill${activeTag === tag.slug ? ' active' : ''}`}
                        onClick={() => handleFilterClick(tag.slug)}
                    >
                        {FILTER_ICONS[tag.slug] && <img src={FILTER_ICONS[tag.slug]} alt={tag.name} />}
                        {tag.name}
                    </button>
                ))}
            </div>

            {/* Posts */}
            {loading && page === 1 ? (
                <div className="loading-spinner">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="#00BC7D" strokeWidth="2" strokeDasharray="50" strokeDashoffset="20">
                            <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite" />
                        </circle>
                    </svg>
                </div>
            ) : posts.length === 0 ? (
                <div className="empty-state">
                    <p>No smoothies yet. Be the first to post! 🍹</p>
                </div>
            ) : (
                posts.map(post => (
                    <PostCard key={post.id} post={post} onLikeToggle={handleLikeToggle} />
                ))
            )}

            {page < lastPage && (
                <div style={{ textAlign: 'center', padding: '1rem' }}>
                    <button className="btn" onClick={() => setPage(p => p + 1)} disabled={loading}>
                        {loading ? 'Loading...' : 'Load More'}
                    </button>
                </div>
            )}
        </div>
    );
}
