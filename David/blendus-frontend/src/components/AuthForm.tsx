import { useState } from 'react';
import { api } from '../lib/api';
import { setAuth } from '../stores/authStore';

interface Props {
    mode: 'login' | 'register';
}

export default function AuthForm({ mode }: Props) {
    const [form, setForm] = useState({ name: '', email: '', password: '', password_confirmation: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (mode === 'register' && form.password !== form.password_confirmation) {
            setError('Passwords do not match.');
            return;
        }
        setLoading(true);
        try {
            const res = mode === 'login'
                ? await api.login({ email: form.email, password: form.password })
                : await api.register(form);
            setAuth(res.token, res.user);
            window.location.href = '/';
        } catch (err: any) {
            setError(err.message ?? 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-logo">
                    <div className="brand">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd"
                                d="M13.4598 4.6821C11.999 4.10603 10.1634 4.03624 8.44724 4.89439C6.74737 5.74439 5.63985 7.23414 4.94838 9.30462C4.24917 11.3983 3.99976 14.0213 3.99976 16.9999C3.99976 17.6747 4.34721 18.4332 4.95687 19.0428C5.56652 19.6525 6.32499 20 6.99976 20C9.8827 20 12.505 19.7575 14.6233 19.06C16.7233 18.3687 18.253 17.258 19.1056 15.5528C19.9679 13.8281 19.9189 11.9841 19.3567 10.5262C19.108 9.88118 18.7767 9.34894 18.4078 8.94001L18.9806 11.8039C19.0889 12.3454 18.7377 12.8723 18.1961 12.9806C17.6546 13.0889 17.1277 12.7377 17.0194 12.1961L16.6363 10.2806L15.9138 11.9061C15.6895 12.4108 15.0985 12.6381 14.5939 12.4138C14.0892 12.1895 13.8619 11.5985 14.0862 11.0939L15.0302 8.96981L12.9061 9.91382C12.4014 10.1381 11.8105 9.91081 11.5862 9.40612C11.3619 8.90143 11.5892 8.31048 12.0939 8.08618L13.7195 7.36372L11.8039 6.98058C11.2623 6.87225 10.9111 6.34542 11.0194 5.80387C11.1277 5.26231 11.6546 4.9111 12.1961 5.01942L14.9778 5.57579C14.5776 5.23353 14.0688 4.92224 13.4598 4.6821Z"
                                fill="#ffffff" />
                        </svg>
                    </div>
                    <h1>BlendUs</h1>
                </div>

                <h2>{mode === 'login' ? 'Welcome back!' : 'Join BlendUs'}</h2>
                <p className="auth-subtitle">
                    {mode === 'login'
                        ? 'Sign in to discover amazing smoothie recipes.'
                        : 'Create an account and start sharing your blends.'}
                </p>

                <form onSubmit={handleSubmit}>
                    {mode === 'register' && (
                        <div className="form-group">
                            <label>Full Name</label>
                            <input className="form-input" type="text" name="name" placeholder="John Smoothie"
                                value={form.name} onChange={handleChange} required />
                        </div>
                    )}
                    <div className="form-group">
                        <label>Email</label>
                        <input className="form-input" type="email" name="email" placeholder="you@blendus.com"
                            value={form.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input className="form-input" type="password" name="password" placeholder="Min. 8 characters"
                            value={form.password} onChange={handleChange} required minLength={8} />
                    </div>
                    {mode === 'register' && (
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input className="form-input" type="password" name="password_confirmation" placeholder="Repeat password"
                                value={form.password_confirmation} onChange={handleChange} required />
                        </div>
                    )}

                    {error && <p className="form-error">{error}</p>}

                    <button className="btn auth-btn" type="submit" disabled={loading}>
                        {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
                    </button>
                </form>

                <p className="auth-switch">
                    {mode === 'login' ? (
                        <>Don't have an account? <a href="/register">Sign up</a></>
                    ) : (
                        <>Already have an account? <a href="/login">Sign in</a></>
                    )}
                </p>
            </div>
        </div>
    );
}
