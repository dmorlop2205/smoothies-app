import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import type { Post } from '../lib/api';
import TagFilter from './TagFilter';
import '../styles/Explore.css';

const PER_PAGE = 12;

export default function ExplorePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [showTags, setShowTags] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  // Load tags once
  useEffect(() => {
    api.getTags().then(tagsRes => setTags(tagsRes.map(t => t.name))).catch(console.error);
  }, []);

  // Load posts when page / tag changes (reset on tag change)
  useEffect(() => {
    const isFirst = page === 1;
    if (isFirst) setLoading(true); else setLoadingMore(true);

    const fetcher = activeTag
      ? api.getPostsByTag(activeTag, page)
      : api.getPosts({ page, per_page: PER_PAGE });

    fetcher
      .then(res => {
        setPosts(prev => isFirst ? res.data : [...prev, ...res.data]);
        setLastPage(res.meta.last_page);
      })
      .catch(console.error)
      .finally(() => { setLoading(false); setLoadingMore(false); });
  }, [page, activeTag]);

  const handleTagClick = (tag: string) => {
    const next = tag === '' ? null : tag;
    if (next === activeTag) return;
    setActiveTag(next);
    setPage(1);
    setPosts([]);
  };

  // Client-side search only filters what's already loaded
  const filteredPosts = search
    ? posts.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      )
    : posts;

  return (
    <section className="explore-wrapper" style={{ marginTop: '0', paddingBottom: '4rem' }}>
      
      <div className="filter-search">
        <span className="search">
          <svg className="search-icon" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.9604 11.4802C19.9604 13.8094 19.0227 15.9176 17.5019 17.4512C16.9332 18.0247 16.2834 18.5173 15.5716 18.9102C14.3594 19.5793 12.9658 19.9604 11.4802 19.9604C6.79672 19.9604 3 16.1637 3 11.4802C3 6.79672 6.79672 3 11.4802 3C16.1637 3 19.9604 6.79672 19.9604 11.4802Z" stroke="#6B7280" strokeWidth="2"/>
            <path d="M18.1553 18.1553L21.8871 21.8871" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </span>
        <div className="filter" onClick={() => setShowTags(!showTags)} style={{ cursor: 'pointer', position: 'absolute', right: 0, zIndex: 10, display: 'flex', alignItems: 'center', height: '100%', paddingRight: '1rem' }}>
          <svg className="filter-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#6B7280" style={{ transition: '.2s ease' }}>
            <path d="M200-160v-280h-80v-80h240v80h-80v280h-80Zm0-440v-200h80v200h-80Zm160 0v-80h80v-120h80v120h80v80H360Zm80 440v-360h80v360h-80Zm240 0v-120h-80v-80h240v80h-80v120h-80Zm0-280v-360h80v360h-80Z"/>
          </svg>
        </div>
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search smoothies, tags, categories..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {showTags && <TagFilter tags={tags} activeTag={activeTag} onTagClick={handleTagClick} />}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>Loading posts...</div>
      ) : (
        <>
          <section className="posts-grid">
            {filteredPosts.map(post => (
              <a href={`/post/${post.id}`} className="grid" key={post.id} style={{ textDecoration: 'none', minHeight: '300px' }}>
                <img 
                  src={post.image_url || '/assets/smoothie2.webp'} 
                  alt={post.title} 
                  loading="lazy"
                  decoding="async"
                  onError={(e) => { e.currentTarget.src = '/assets/smoothie2.webp' }}
                />
                <div className="overlay">
                  <h4 className="title">{post.title}</h4>
                  <div className="likes-comments" style={{ display: 'flex', gap: '1rem' }}>
                    <span className="likes">{post.likes_count ?? 0} ❤️</span>
                    <div className="comments">{post.comments_count ?? 0} 💬</div>
                  </div>
                </div>
              </a>
            ))}
            
            {filteredPosts.length === 0 && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem', color: 'var(--gray-500)' }}>
                No smoothies found matching your search.
              </div>
            )}
          </section>

          {page < lastPage && !search && (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <button
                onClick={() => setPage(p => p + 1)}
                disabled={loadingMore}
                style={{
                  background: 'var(--amber-600)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 32px',
                  borderRadius: '100px',
                  cursor: loadingMore ? 'not-allowed' : 'pointer',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  opacity: loadingMore ? 0.7 : 1,
                  transition: '0.2s ease',
                }}
              >
                {loadingMore ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

