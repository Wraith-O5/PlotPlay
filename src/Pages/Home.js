import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Main.css';

export function Home({ isLoggedIn }) {
    const [showPopup, setShowPopup] = useState(false);

    return (
        <div className="landing-page">
            <div className="hero-content">
                <h1 className="hero-title">Vivid Tale</h1>
                <p style={{ fontSize: '1.5rem', marginBottom: '3rem', opacity: 0.9 }}>
                    Where stories come to life. Read the extraordinary, write the legendary.
                </p>

                <div className="hero-actions">
                    {isLoggedIn ? (
                        <>
                            <Link to="/Dashboard" className="btn-magical btn-read-magical">Read</Link>
                            <Link to="/MyWorks" className="btn-magical btn-write-magical">Write</Link>
                        </>
                    ) : (
                        <>
                            <button onClick={() => setShowPopup(true)} className="btn-magical btn-read-magical">Read</button>
                            <button onClick={() => setShowPopup(true)} className="btn-magical btn-write-magical">Write</button>
                        </>
                    )}
                </div>
            </div>

            {showPopup && !isLoggedIn && (
                <div className="auth-popup-overlay" onClick={() => setShowPopup(false)}>
                    <div className="auth-popup" onClick={e => e.stopPropagation()}>
                        <button className="close-popup" onClick={() => setShowPopup(false)}>×</button>
                        <h2 style={{ color: 'var(--text-main)', fontSize: '2rem', marginBottom: '1.5rem' }}>Please Register!</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
                            <Link to="/SignUp" className="btn-magical btn-read-magical" style={{ textAlign: 'center' }}>Sign Up</Link>
                            <Link to="/Login" className="btn-magical btn-write-magical" style={{ textAlign: 'center' }}>Log In</Link>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .auth-popup-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.8);
                    z-index: 1000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    backdrop-filter: blur(5px);
                }
                .auth-popup {
                    background: var(--bg-card);
                    padding: 3rem;
                    border-radius: 1.5rem;
                    border: 1px solid var(--glass-border);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    min-width: 400px;
                    position: relative;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                }
                .close-popup {
                    position: absolute;
                    top: 1rem;
                    right: 1.5rem;
                    background: transparent;
                    border: none;
                    color: var(--text-muted);
                    font-size: 2rem;
                    cursor: pointer;
                }
                .close-popup:hover {
                    color: white;
                }
            `}</style>
        </div>
    );
}