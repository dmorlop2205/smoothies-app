import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import type { User, Post } from '../lib/api';
import { $user as $authUser, $isLoggedIn } from '../stores/authStore';
import './ProfilePage.css';

interface Props {
    userId: number;
}

type ModalType = 'followers' | 'following' | 'edit' | null;

export default function ProfilePage({ userId }: Props) {
    const [user, setUser] = useState<User | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [postsLoading, setPostsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'recipes' | 'saved' | 'liked'>('recipes');
    const [modal, setModal] = useState<ModalType>(null);
    const [modalUsers, setModalUsers] = useState<User[]>([]);
    const [modalLoading, setModalLoading] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followLoading, setFollowLoading] = useState(false);

    // Edit profile form state
    const [editName, setEditName] = useState('');
    const [editUsername, setEditUsername] = useState('');
    const [editBio, setEditBio] = useState('');
    const [editAvatar, setEditAvatar] = useState('');
    const [editAvatarFile, setEditAvatarFile] = useState<File | null>(null);
    const [editLoading, setEditLoading] = useState(false);
    const [editError, setEditError] = useState('');

    const authUser = $authUser.get();
    const isOwn = authUser?.id === userId;

    useEffect(() => {
        loadUser();
    }, [userId]);

    useEffect(() => {
        loadPosts();
    }, [userId, activeTab]);

    const loadUser = async () => {
        setLoading(true);
        try {
            const u = await api.getUser(userId);
            setUser(u);
            setIsFollowing(u.is_following ?? false);
            setEditName(u.name ?? '');
            setEditUsername(u.username ?? '');
            setEditBio(u.bio ?? '');
            setEditAvatar(u.avatar ?? '');
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const loadPosts = async () => {
        setPostsLoading(true);
        try {
            let res;
            if (activeTab === 'recipes') {
                res = await api.getUserPosts(userId);
            } else if (activeTab === 'saved') {
                res = await api.getUserSavedPosts(userId);
            } else {
                res = await api.getUserLikedPosts(userId);
            }
            setPosts(res.data);
        } catch {
            setPosts([]);
        } finally {
            setPostsLoading(false);
        }
    };

    const openModal = async (type: 'followers' | 'following') => {
        setModal(type);
        setModalLoading(true);
        try {
            const list = type === 'followers'
                ? await api.getFollowers(userId)
                : await api.getFollowing(userId);
            setModalUsers(list);
        } catch {
            setModalUsers([]);
        } finally {
            setModalLoading(false);
        }
    };

    const handleFollow = async () => {
        if (!$isLoggedIn.get()) { window.location.href = '/login'; return; }
        setFollowLoading(true);
        try {
            if (isFollowing) {
                await api.unfollowUser(userId);
                setIsFollowing(false);
                setUser(prev => prev ? { ...prev, followers_count: (prev.followers_count ?? 1) - 1 } : prev);
            } else {
                await api.followUser(userId);
                setIsFollowing(true);
                setUser(prev => prev ? { ...prev, followers_count: (prev.followers_count ?? 0) + 1 } : prev);
            }
        } catch {
        } finally {
            setFollowLoading(false);
        }
    };

    const handleEditSave = async () => {
        if (!user) return;
        setEditLoading(true);
        setEditError('');
        try {
            const updated = await api.updateUser(userId, {
                name: editName,
                username: editUsername,
                bio: editBio,
                avatar: editAvatar || undefined,
                avatar_file: editAvatarFile || undefined,
            });
            setUser(updated);
            setModal(null);
            setEditAvatarFile(null);
            // Sync local auth store if editing own profile
            if (isOwn) {
                // We keep the current token
                const token = localStorage.getItem('blendus_token');
                if (token) {
                    import('../stores/authStore').then(({ setAuth }) => {
                        setAuth(token, updated);
                    });
                }
            }
        } catch (err: any) {
            setEditError(err.message ?? 'Failed to save changes.');
        } finally {
            setEditLoading(false);
        }
    };

    if (loading) return (
        <div className="profile-loading">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#00BC7D" strokeWidth="2" strokeDasharray="50" strokeDashoffset="20">
                    <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite" />
                </circle>
            </svg>
        </div>
    );

    if (!user) return (
        <div className="empty-state">
            <p>User not found 🍹</p>
            <button onClick={() => window.history.back()} className="btn" style={{ display: 'inline-block', marginTop: '1rem', border: 'none', cursor: 'pointer' }}>Back to safety</button>
        </div>
    );

    const initials = user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

    return (
        <div className="profile-dashboard">
            {/* ── HERO ── */}
            <div className="profile-hero-card">
                <div className="profile-hero-bg" />
                <div className="profile-hero-content">
                    <div className="profile-avatar-wrap">
                        {user.avatar ? (
                            <img src={user.avatar} alt={user.name} className="profile-avatar-img" />
                        ) : (
                            <div className="profile-avatar-initials">{initials}</div>
                        )}
                    </div>
                    <div className="profile-info">
                        <h1 className="profile-name">{user.name}</h1>
                        <p className="profile-username">@{user.username}</p>
                        {user.bio && <p className="profile-bio">{user.bio}</p>}
                        <div className="profile-stats">
                            <button className="profile-stat-btn" onClick={() => openModal('followers')}>
                                <span className="stat-num">{user.followers_count ?? 0}</span>
                                <span className="stat-label">Followers</span>
                            </button>
                            <button className="profile-stat-btn" onClick={() => openModal('following')}>
                                <span className="stat-num">{user.following_count ?? 0}</span>
                                <span className="stat-label">Following</span>
                            </button>
                            <div className="profile-stat-btn">
                                <span className="stat-num">{user.posts_count ?? posts.length}</span>
                                <span className="stat-label">Recipes</span>
                            </div>
                        </div>
                    </div>
                    <div className="profile-actions">
                        {isOwn ? (
                            <button className="btn btn-outline" onClick={() => setModal('edit')}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="currentColor"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                                Edit Profile
                            </button>
                        ) : (
                            <button
                                className={`btn ${isFollowing ? 'btn-outline' : ''}`}
                                onClick={handleFollow}
                                disabled={followLoading}
                            >
                                {followLoading ? '...' : isFollowing ? 'Unfollow' : 'Follow'}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* ── TABS ── */}
            <div className="profile-tabs">
                <button className={`profile-tab ${activeTab === 'recipes' ? 'active' : ''}`} onClick={() => setActiveTab('recipes')}>
                    <span className="tab-icon">🍹</span>
                    Recipes
                </button>
                {isOwn && (
                    <button className={`profile-tab ${activeTab === 'saved' ? 'active' : ''}`} onClick={() => setActiveTab('saved')}>
                        <span className="tab-icon">🔖</span>
                        Saved
                    </button>
                )}
                <button className={`profile-tab ${activeTab === 'liked' ? 'active' : ''}`} onClick={() => setActiveTab('liked')}>
                    <span className="tab-icon">❤️</span>
                    Liked
                </button>
            </div>

            {/* ── POSTS GRID ── */}
            <div className="profile-section">
                {postsLoading ? (
                    <div className="profile-loading">
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="#00BC7D" strokeWidth="2" strokeDasharray="50" strokeDashoffset="20">
                                <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite" />
                            </circle>
                        </svg>
                    </div>
                ) : posts.length === 0 ? (
                    <div className="empty-state">
                        <p>{activeTab === 'recipes' ? 'No recipes shared yet.' : activeTab === 'saved' ? 'No saved posts.' : 'No liked posts.'}</p>
                        {isOwn && activeTab === 'recipes' && <a href="/create" className="btn" style={{ display: 'inline-block', marginTop: '1rem' }}>Share your first recipe!</a>}
                    </div>
                ) : (
                    <div className="posts-grid">
                        {posts.map(post => (
                            <a href={`/post/${post.id}`} key={post.id} className="post-grid-card">
                                {post.image_url ? (
                                    <img src={post.image_url} alt={post.title} className="post-grid-img" />
                                ) : (
                                    <div className="post-grid-placeholder">🍹</div>
                                )}
                                <div className="post-grid-info">
                                    <p className="post-grid-title">{post.title}</p>
                                    <div className="post-grid-meta">
                                        <span>❤️ {post.likes_count}</span>
                                        <span>💬 {post.comments_count}</span>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                )}
            </div>

            {/* ── FOLLOWERS / FOLLOWING MODAL ── */}
            {(modal === 'followers' || modal === 'following') && (
                <div className="modal-overlay" onClick={() => setModal(null)}>
                    <div className="modal-card" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{modal === 'followers' ? 'Followers' : 'Following'}</h3>
                            <button className="modal-close" onClick={() => setModal(null)}>✕</button>
                        </div>
                        <div className="modal-body">
                            {modalLoading ? (
                                <p className="modal-hint">Loading...</p>
                            ) : modalUsers.length === 0 ? (
                                <p className="modal-hint">No users yet.</p>
                            ) : (
                                modalUsers.map(u => {
                                    const ini = u.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
                                    return (
                                        <a href={`/profile/${u.id}`} key={u.id} className="modal-user-row" onClick={() => setModal(null)}>
                                            <div className="modal-avatar">{u.avatar ? <img src={u.avatar} alt={u.name} /> : ini}</div>
                                            <div>
                                                <p className="modal-user-name">{u.name}</p>
                                                <p className="modal-user-username">@{u.username}</p>
                                            </div>
                                        </a>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* ── EDIT PROFILE MODAL ── */}
            {modal === 'edit' && (
                <div className="modal-overlay" onClick={() => setModal(null)}>
                    <div className="modal-card modal-edit" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Edit Profile</h3>
                            <button className="modal-close" onClick={() => setModal(null)}>✕</button>
                        </div>
                        <div className="modal-body">
                            <div className="edit-field">
                                <label>Name</label>
                                <input
                                    type="text"
                                    value={editName}
                                    onChange={e => setEditName(e.target.value)}
                                    placeholder="Your full name"
                                />
                            </div>
                            <div className="edit-field">
                                <label>Username</label>
                                <input
                                    type="text"
                                    value={editUsername}
                                    onChange={e => setEditUsername(e.target.value)}
                                    placeholder="@username"
                                />
                            </div>
                            <div className="edit-field">
                                <label>Bio</label>
                                <textarea
                                    value={editBio}
                                    onChange={e => setEditBio(e.target.value)}
                                    placeholder="Tell the community about yourself..."
                                    rows={3}
                                />
                            </div>
                            <div className="edit-field">
                                <label>Avatar URL</label>
                                <input
                                    type="url"
                                    value={editAvatar}
                                    onChange={e => setEditAvatar(e.target.value)}
                                    placeholder="https://example.com/avatar.jpg"
                                />
                            </div>
                            <div className="edit-field">
                                <label>Or Upload Photo</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={e => setEditAvatarFile(e.target.files?.[0] || null)}
                                    style={{ padding: '0.5rem 0' }}
                                />
                            </div>
                            {editError && <p className="edit-error">{editError}</p>}
                            <button className="btn edit-save-btn" onClick={handleEditSave} disabled={editLoading}>
                                {editLoading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
