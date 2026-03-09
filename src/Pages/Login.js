import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import logo from '../assets/logo.png';

export function Login({ onLogin }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'Login failed. Please try again.');
                return;
            }

            // Store user info in localStorage
            localStorage.setItem('user', JSON.stringify(data.user));

            onLogin();

            // Navigate based on role
            if (data.user.role === 'writer') {
                navigate('/MyWorks');
            } else {
                navigate('/Dashboard');
            }
        } catch (err) {
            setError('Network error. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <img src={logo} alt="Vivid Tale Logo" style={{ height: '80px', marginBottom: '1rem' }} />
                    <h1 style={{ color: 'var(--primary-neon)', margin: 0, fontSize: '2.5rem' }}>Vivid Tale</h1>
                </div>
                <h2>Log In</h2>
                {error && (
                    <div style={{
                        background: 'rgba(255, 50, 50, 0.15)',
                        border: '1px solid rgba(255, 50, 50, 0.4)',
                        borderRadius: '8px',
                        padding: '0.75rem 1rem',
                        marginBottom: '1rem',
                        color: '#ff6b6b',
                        fontSize: '0.9rem'
                    }}>
                        {error}
                    </div>
                )}
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email / Username</label>
                        <input
                            type="text"
                            id="email"
                            required
                            placeholder="Enter your email or username"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            required
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <div style={{ textAlign: 'right', marginTop: '0.5rem' }}>
                            <Link to="#" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Forgot password?</Link>
                        </div>
                    </div>
                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? 'Logging in...' : 'Log In'}
                    </button>
                </form>
                <div className="auth-footer">
                    Don't have an account? <Link to="/SignUp">Sign Up</Link>
                </div>
            </div>
        </div>
    );
}
