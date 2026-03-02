import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './Writer.css';

export function StoryManagement() {
    const { storyId } = useParams();

    return (
        <div className="writer-container">
            <div className="writer-header">
                <div>
                    <Link to="/MyWorks" style={{ fontSize: '0.875rem', color: 'var(--primary-neon)', textDecoration: 'none', fontWeight: 'bold' }}>← Back to My Works</Link>
                    <h1>Edit: FRACTURE</h1>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn-secondary">Read</button>
                    <button className="btn-primary">Write</button>
                </div>
            </div>

            <div className="management-stats">
                <div className="stat-card">
                    <h4>Total Views</h4>
                    <p>2,450</p>
                </div>
                <div className="stat-card">
                    <h4>Subscribers</h4>
                    <p>185</p>
                </div>
                <div className="stat-card">
                    <h4>Rating</h4>
                    <p>4.8</p>
                </div>
            </div>

            <div className="chapter-list-section">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ margin: 0 }}>Chapters</h2>
                    <Link to={`/Writer/${storyId}/new`} className="btn-primary" style={{ padding: '0.5rem 1.5rem' }}>+ New Chapter</Link>
                </div>
                <div className="chapter-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {[1, 2, 3].map(num => (
                        <div key={num} className="chapter-item">
                            <span>Chapter {num}: The Shattered Gateway</span>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <Link to={`/Writer/${storyId}/${num}`} className="btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.875rem' }}>Edit</Link>
                                <button className="btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.875rem', color: '#ef4444' }}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
