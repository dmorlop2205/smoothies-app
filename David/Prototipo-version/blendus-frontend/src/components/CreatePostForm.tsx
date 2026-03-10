import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import type { Tag } from '../lib/api';
import { $isLoggedIn } from '../stores/authStore';

export default function CreatePostForm() {
    const [tags, setTags] = useState<Tag[]>([]);
    const [form, setForm] = useState({
        title: '',
        description: '',
        preparation_time: '',
        image_url: '',
        selectedTags: [] as number[],
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (!$isLoggedIn.get()) { window.location.href = '/login'; return; }
        api.getTags().then(setTags).catch(() => { });
    }, []);

    const handleTagToggle = (id: number) => {
        setForm(f => ({
            ...f,
            selectedTags: f.selectedTags.includes(id)
                ? f.selectedTags.filter(t => t !== id)
                : [...f.selectedTags, id],
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await api.createPost({
                title: form.title,
                description: form.description,
                preparation_time: form.preparation_time ? parseInt(form.preparation_time) : undefined,
                image_url: form.image_url || undefined,
                tags: form.selectedTags,
            });
            setSuccess(true);
            setTimeout(() => { window.location.href = '/'; }, 1500);
        } catch (err: any) {
            setError(err.message ?? 'Failed to create post.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="create-page">
                <div className="create-card" style={{ textAlign: 'center', padding: '3rem' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
                    <h2 style={{ color: 'var(--emerald-600)' }}>Post published!</h2>
                    <p style={{ color: 'var(--gray-500)', marginTop: '.5rem' }}>Redirecting to your feed...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="create-page">
            <div className="create-card">
                <h2>🍹 Share a Smoothie Recipe</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Recipe Title *</label>
                        <input className="form-input" type="text" placeholder="e.g. Ultimate Green Detox"
                            value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
                    </div>
                    <div className="form-group">
                        <label>Description & Ingredients *</label>
                        <textarea className="form-textarea" placeholder="Describe your recipe, ingredients, and tips..."
                            value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required />
                    </div>
                    <div className="form-group">
                        <label>Preparation Time (minutes)</label>
                        <input className="form-input" type="number" min="1" placeholder="e.g. 5"
                            value={form.preparation_time} onChange={e => setForm(f => ({ ...f, preparation_time: e.target.value }))} />
                    </div>
                    <div className="form-group">
                        <label>Image URL</label>
                        <input className="form-input" type="url" placeholder="https://..."
                            value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} />
                    </div>
                    <div className="form-group">
                        <label>Categories</label>
                        <div className="tag-checkboxes">
                            {tags.map(tag => (
                                <label key={tag.id} className="tag-checkbox-label">
                                    <input type="checkbox" checked={form.selectedTags.includes(tag.id)}
                                        onChange={() => handleTagToggle(tag.id)} />
                                    #{tag.name}
                                </label>
                            ))}
                        </div>
                    </div>

                    {error && <p className="form-error">{error}</p>}

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button type="submit" className="btn" disabled={loading} style={{ flex: 1, padding: '.8rem' }}>
                            {loading ? 'Publishing...' : '🚀 Publish Recipe'}
                        </button>
                        <a href="/" className="btn btn-ghost" style={{ flex: 1, padding: '.8rem', textAlign: 'center', textDecoration: 'none' }}>
                            Cancel
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}
