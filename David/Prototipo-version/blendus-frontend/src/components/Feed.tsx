import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import type { Post, Tag } from '../lib/api';
import PostCard from './PostCard';
import './Feed.css';
import './FiltersComponent.css';
import './StoriesComponent.css';

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
            {/* Stories — static avatars for now */}
            <section className="stories">
                <div className="you">
                    <div className="circle">
                        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <line fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12" x2="12" y1="19" y2="5"/>
                            <line fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="5" x2="19" y1="12" y2="12"/>
                        </svg>
                    </div>
                    <p>You</p>
                </div>
                {[
                    { name: 'John', img: '/user1.jpg' },
                    { name: 'Marie', img: '/user2.jpg' },
                    { name: 'Julia', img: '/user3.jpg' },
                    { name: 'Alex', img: '/Alexelcapo.webp' },
                    { name: 'Robert', img: '/user 4.jpg' },
                    { name: 'James', img: '/user 5.jpg' },
                ].map(u => (
                    <div className="storie" key={u.name}>
                        <div className="circle"><img src={u.img} alt={u.name} /></div>
                        <p>{u.name}</p>
                    </div>
                ))}
            </section>

            {/* Filters */}
            <section className="filters">
                <span
                    className={`filter ${activeTag === null ? 'active' : ''}`}
                    onClick={() => handleFilterClick(null)}
                    style={{ cursor: 'pointer' }}
                >
                    <img src="/sparks.webp" alt="All" />
                    <p>All</p>
                </span>
                {tags.map(tag => (
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

            {/* Posts */}
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
