import React, { useState } from 'react';
import { api } from '../lib/api';
import { setAuth } from '../stores/authStore';
import './RegisterForm.css'; // Using RegisterForm's CSS classes since Paco didn't commit Login.css

export default function LoginForm() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm(f => ({ ...f, [e.target.id]: e.target.value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await api.login(form.email, form.password);
            setAuth(res.token, res.user);
            window.location.href = '/';
        } catch (err: any) {
            setError(err.message ?? 'Invalid credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className='register-form' onSubmit={handleSubmit}>
            <div className="email">
                <label className="label" htmlFor="email">Email</label>
                <input className="text-input" type="email" id="email" placeholder='youremail@example.org' required value={form.email} onChange={handleChange} />
            </div>
            <div className="password">
                <label className="label" htmlFor="password">Password</label>
                <input className="text-input" type="password" id="password" placeholder='Password' required value={form.password} onChange={handleChange} />
            </div>
            
            {error && <p style={{ color: 'var(--pink)', fontSize: '0.9rem', textAlign: 'center' }}>{error}</p>}

            <button className="btn register-btn" type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Sign In'}
            </button>
            <button type="button" className="btn secondary-btn" onClick={() => window.location.href = '/register'}> 
                I don't have an account
            </button>
            <a href="/" style={{ textAlign: 'center', color: 'var(--gray-500)', fontSize: '0.9rem', textDecoration: 'none', fontWeight: 500 }}>
                Continue as Guest
            </a>
        </form>
    );
}
