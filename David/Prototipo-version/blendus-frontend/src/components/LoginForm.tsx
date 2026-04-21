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
            <div className="form-title-group">
                <label className="label" htmlFor="email">Sign in to BlendUs</label>
            </div>
            
            <div className="email">
                <input className="text-input" type="email" id="email" placeholder='Username or email' required value={form.email} onChange={handleChange} />
                <input className="text-input" type="password" id="password" placeholder='Password' required value={form.password} onChange={handleChange} />
            </div>
            
            {error && <p className="form-error-inline">{error}</p>}

            <button className="btn register-btn" type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Log In'}
            </button>
            
            <a href="#" className="forgot-link">Forgot Your password?</a>
            
            <button type="button" className="btn secondary-btn" onClick={() => window.location.href = '/register'}> 
                Create new account
            </button>
            <div className="guest-divider">
                <a href="/" className="guest-link">Continue as Guest</a>
            </div>
        </form>
    );
}
