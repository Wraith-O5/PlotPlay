import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import logo from '../assets/logo.png';

export function SignUp() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Placeholder signup logic
        console.log('Sign Up submitted');
        navigate('/Login');
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <img src={logo} alt="Vivid Tale Logo" style={{ height: '80px', marginBottom: '1rem' }} />
                    <h1 style={{ color: 'var(--primary-neon)', margin: 0, fontSize: '2.5rem' }}>Vivid Tale</h1>
                </div>
                <h2>Sign Up</h2>
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" required placeholder="Enter your email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" required placeholder="Choose a username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" required placeholder="Create a password" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" id="confirmPassword" required placeholder="Confirm your password" />
                    </div>
                    <button type="submit" className="auth-button">Sign Up</button>
                </form>
                <div className="auth-footer">
                    Already have an account? <Link to="/Login">Log In</Link>
                </div>
            </div>
        </div>
    );
}
