import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Writer.css';
import fractureCover from '../assets/fracture.png';

export function MyWorks() {
    const [works, setWorks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchWorks = async () => {
            // Get writer ID from localStorage
            const userRaw = localStorage.getItem('user');
            if (!userRaw) {
                setError('Please log in to view your works.');
                setLoading(false);
                return;
            }

            const user = JSON.parse(userRaw);
            const writerId = user.writerId || user.id;

            try {
                const res = await fetch(`/api/writers/${writerId}/novels`);
                const data = await res.json();
                if (res.ok) {
                    setWorks(data.novels);
                } else {
                    setError(data.error || 'Failed to load your works.');
                }
            } catch (err) {
                setError('Network error while loading your works.');
            } finally {
                setLoading(false);
            }
        };

        fetchWorks();
    }, []);

    return (
        <div className="writer-container">
            <div className="writer-header">
                <h1>My Works</h1>
                <Link to="/CreateStory" className="btn-primary">Create New Story</Link>
            </div>

            {loading && (
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>
                    Loading your works...
                </p>
            )}
            {error && (
                <p style={{ color: '#ff6b6b', textAlign: 'center', padding: '2rem' }}>{error}</p>
            )}

            {!loading && !error && works.length === 0 && (
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>
                    You haven't created any stories yet.
                </p>
            )}

            {!loading && !error && (
                <div className="works-grid">
                    {works.map(work => (
                        <Link
                            key={work.novel_id}
                            to={`/Writer/${work.novel_id}/0`}
                            className="work-card"
                        >
                            <div className="work-card-img">
                                <img src={work.cover_image_url || fractureCover} alt={work.name} />
                            </div>
                            <div className="work-card-content">
                                <h3>{work.name}</h3>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                                    Novel • {work.genre || 'Uncategorized'}
                                </p>
                                <div className="work-stats">
                                    <span>📖 {work.chapter_count} Chapters</span>
                                    <span>★ {work.review_score || '—'}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
