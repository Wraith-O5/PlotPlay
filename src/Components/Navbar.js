import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Navbar.css';
import { navigationLinks } from '../configs/navigation';

export function Navbar({ isLoggedIn, onLogout }) {
    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link to="/" className="nav-logo">
                    <img src={logo} alt="Vivid Tale Logo" style={{ height: '40px', marginRight: '10px' }} />
                    Vivid Tale
                </Link>

                <div className="nav-links">
                    {navigationLinks.map((link) => (
                        <Link key={link.label} to={link.path} className="nav-item">
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className="nav-actions">
                    {isLoggedIn ? (
                        <div className="user-profile" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <button onClick={onLogout} className="btn-signup" style={{ background: 'transparent', border: '1px solid var(--primary-neon)' }}>Log Out</button>
                            <div className="profile-icon">
                                👤
                            </div>
                        </div>
                    ) : (
                        <>
                            <Link to="/Login" className="nav-item">Log In</Link>
                            <Link to="/SignUp" className="btn-signup">Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}