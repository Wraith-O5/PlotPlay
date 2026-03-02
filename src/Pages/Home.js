import React from 'react';
import { Link } from 'react-router-dom';
import './Main.css';

export function Home() {
    return (
        <div className="landing-page">
            <div className="hero-content">
                <h1 className="hero-title">Vivid Tale</h1>
                <p style={{ fontSize: '1.5rem', marginBottom: '3rem', opacity: 0.9 }}>
                    Where stories come to life. Read the extraordinary, write the legendary.
                </p>

                <div className="hero-actions">
                    <Link to="/NovelDetail" className="btn-magical btn-read-magical">Explore Stories</Link>
                    <Link to="/Login" className="btn-magical btn-write-magical">Start Writing</Link>
                </div>
            </div>
        </div>
    );
}