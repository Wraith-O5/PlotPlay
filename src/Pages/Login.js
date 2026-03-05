import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import logo from '../assets/logo.png';

export function Login({ onLogin }) {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin();
        navigate('/');
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <img src={logo} alt="Vivid Tale Logo" style={{ height: '80px', marginBottom: '1rem' }} />
                    <h1 style={{ color: 'var(--primary-neon)', margin: 0, fontSize: '2.5rem' }}>Vivid Tale</h1>
                </div>
                <h2>Log In</h2>
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email / Username</label>
                        <input type="text" id="email" required placeholder="Enter your email or username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" required placeholder="Enter your password" />
                        <div style={{ textAlign: 'right', marginTop: '0.5rem' }}>
                            <Link to="#" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Forgot password?</Link>
                        </div>
                    </div>
                    <button type="submit" className="auth-button">Log In</button>
                </form>
                <div className="auth-footer">
                    Don't have an account? <Link to="/SignUp">Sign Up</Link>
                </div>
            </div>
        </div>
    );
}
