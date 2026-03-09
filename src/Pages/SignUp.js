import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import logo from '../assets/logo.png';

export function SignUp({ onLogin }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'Sign up failed. Please try again.');
                return;
            }

            // Store user info in localStorage
            localStorage.setItem('user', JSON.stringify({
                id: data.reader.reader_id,
                writerId: data.writer.writer_id,
                username: data.reader.username,
                email: data.reader.email,
            }));

            onLogin();
            navigate('/Dashboard');
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
                <h2>Sign Up</h2>
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
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            required
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            required
                            placeholder="Choose a username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            required
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            required
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>
                <div className="auth-footer">
                    Already have an account? <Link to="/Login">Log In</Link>
                </div>
            </div>
        </div>
    );
}
