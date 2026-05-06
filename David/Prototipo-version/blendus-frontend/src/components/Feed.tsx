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
    const [feedType, setFeedType] = useState<'latest' | 'personalized'>('latest');

    useEffect(() => {
        api.getTags().then(setTags).catch(() => { });
    }, []);

    useEffect(() => {
        setLoading(true);

        const fetcher = activeTag
            ? api.getPostsByTag(activeTag, page)
            : feedType === 'personalized'
                ? api.getPersonalizedPosts(page)
                : api.getPosts({ page });

        fetcher
            .then(res => {
                setPosts(prev => page === 1 ? res.data : [...prev, ...res.data]);
                setLastPage(res.meta.last_page);
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, [activeTag, page, feedType]);

    const handleFilterClick = (slug: string | null) => {
        if (activeTag === slug) return;
        
        setActiveTag(slug);
        setFeedType('latest');
        setPage(1);
        setPosts([]);
    };

    const handleFeedTypeChange = (type: 'latest' | 'personalized') => {
        if (feedType === type && !activeTag) return;

        setFeedType(type);
        setActiveTag(null);
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
            <div className="hero-banner">
                <h2>Welcome to BlendUs! 🧋</h2>
                <p>Discover, mix, and share the world's best smoothie recipes.</p>
            </div>

            {/* Feed Type Switcher (Segmented Control) */}
            <div>
                <div className="feed-tabs-container">
                    <button
                        className={`feed-tab ${feedType === 'latest' ? 'active' : ''}`}
                        onClick={() => handleFeedTypeChange('latest')}
                    >
                        <span>Latest</span>
                    </button>
                    <button
                        className={`feed-tab ${feedType === 'personalized' ? 'active' : ''}`}
                        onClick={() => handleFeedTypeChange('personalized')}
                    >
                        <span>For You</span>
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="filters-section">
                <h3 className="section-title">Popular Categories</h3>
                <section className="filters">
                    <div
                        className={`filter ${activeTag === null ? 'active' : ''}`}
                        onClick={() => handleFilterClick(null)}
                    >
                        <img src="/fire.webp" alt="All" />
                        <p>All</p>
                    </div>
                    {tags.slice(0, 6).map(tag => (
                        <div
                            key={tag.id}
                            className={`filter ${activeTag === tag.slug ? 'active' : ''}`}
                            onClick={() => handleFilterClick(tag.slug)}
                        >
                            {FILTER_ICONS[tag.slug] && <img src={FILTER_ICONS[tag.slug]} alt={tag.name} />}
                            <p>{tag.name}</p>
                        </div>
                    ))}
                </section>
            </div>

            {/* Posts */}
            <div className="posts-list">
                {loading && page === 1 ? (
                    <div style={{ textAlign: 'center', padding: '3rem' }}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="#e17100" strokeWidth="2" strokeDasharray="50" strokeDashoffset="20">
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
                        style={{ background: '#e17100', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '20px', cursor: 'pointer', fontWeight: 600 }}
                    >
                        {loading ? 'Loading...' : 'Load More'}
                    </button>
                </div>
            )}
        </section>
    );
}
