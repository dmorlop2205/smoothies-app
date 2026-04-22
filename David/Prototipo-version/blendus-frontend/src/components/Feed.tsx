import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import type { Post, Tag } from '../lib/api';
import PostCard from './PostCard';
import './Feed.css';
import './FiltersComponent.css';

const FILTER_ICONS: Record<string, string> = {
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
        const fetcher = activeTag
            ? api.getPostsByTag(activeTag, page)
            : api.getPosts({ page });

        fetcher
            .then(res => {
                setPosts(prev => page === 1 ? res.data : [...prev, ...res.data]);
                setLastPage(res.meta.last_page);
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
            p.id === postId ? { ...p, has_liked: liked, likes_count: count } : p
        ));
    };

    return (
        <section className="left-content">

            {/* Hero / Welcome Banner */}
            <div className="hero-banner" style={{
                background: 'linear-gradient(135deg, var(--amber-500) 0%, var(--amber-700, #b45309) 100%)',
                borderRadius: '24px',
                padding: '2.5rem 2rem',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                boxShadow: '0 4px 20px rgba(180, 83, 9, 0.25)',
                margin: '0 0 2rem 0'
            }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', color: 'white' }}>Welcome to BlendUs! 🧋</h2>
                <p style={{ fontSize: '1.1rem', opacity: 0.9, margin: 0 }}>Discover, mix, and share the world's best smoothie recipes.</p>
            </div>

            {/* Filters */}
            <div style={{ marginBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.75rem' }}>Popular Categories</h3>
                <section className="filters">
                    <span
                        className={`filter ${activeTag === null ? 'active' : ''}`}
                        onClick={() => handleFilterClick(null)}
                        style={{ cursor: 'pointer' }}
                    >
                        <img src="/sparks.webp" alt="All" />
                        <p>All</p>
                    </span>
                    {tags.slice(0, 6).map(tag => (
                        <span
                            key={tag.id}
                            className={`filter ${activeTag === tag.slug ? 'active' : ''}`}
                            onClick={() => handleFilterClick(tag.slug)}
                            style={{ cursor: 'pointer' }}
                        >
                            {FILTER_ICONS[tag.slug] && <img src={FILTER_ICONS[tag.slug]} alt={tag.name} />}
                            <p>{tag.name}</p>
                        </span>
                    ))}
                </section>
            </div>

            {/* Posts */}
            <div className="posts-list">
                {loading && page === 1 ? (
                    <div style={{ textAlign: 'center', padding: '3rem' }}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="#00BC7D" strokeWidth="2" strokeDasharray="50" strokeDashoffset="20">
                                <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite" />
                            </circle>
                        </svg>
                    </div>
                ) : posts.length === 0 ? (
                    <div style={{ textAlign: 'center', color: '#888', padding: '3rem 0' }}>
                        <p>No smoothies yet. Be the first to post! 🍹</p>
                    </div>
                ) : (
                    posts.map(post => (
                        <PostCard key={post.id} post={post} onLikeToggle={handleLikeToggle} />
                    ))
                )}
            </div>

            {page < lastPage && (
                <div style={{ textAlign: 'center', padding: '1rem' }}>
                    <button
                        onClick={() => setPage(p => p + 1)}
                        disabled={loading}
                        style={{ background: '#007A55', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '20px', cursor: 'pointer', fontWeight: 600 }}
                    >
                        {loading ? 'Loading...' : 'Load More'}
                    </button>
                </div>
            )}
        </section>
    );
}
