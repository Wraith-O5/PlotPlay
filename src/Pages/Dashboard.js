import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Main.css';
import fractureCover from '../assets/fracture.png';

export function Dashboard() {
    const [novels, setNovels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchNovels = async () => {
            try {
                const res = await fetch('/api/novels');
                const data = await res.json();
                if (res.ok) {
                    setNovels(data.novels);
                } else {
                    setError('Failed to load novels.');
                }
            } catch (err) {
                setError('Network error while loading novels.');
            } finally {
                setLoading(false);
            }
        };

        fetchNovels();
    }, []);

    // Use the first novel as "recommended", rest as "bookmarks"
    const recommended = novels.length > 0 ? novels[0] : null;
    const bookmarks = novels.length > 1 ? novels.slice(1) : [];

    return (
        <div className="dashboard-page">
            <div className="dashboard-container">
                <div className="dashboard-header-simple">
                    <button className="btn-toggle-main active">Read</button>
                    <button className="btn-toggle-main">Write</button>
                </div>

                {loading && (
                    <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>
                        Loading novels...
                    </p>
                )}
                {error && (
                    <p style={{ color: '#ff6b6b', textAlign: 'center', padding: '2rem' }}>{error}</p>
                )}

                {!loading && !error && recommended && (
                    <div className="section-group">
                        <h2 className="section-title">Recommended for You</h2>
                        <Link
                            to={`/NovelDetail/${recommended.novel_id}`}
                            className="recommended-card"
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <img
                                src={recommended.cover_image_url || fractureCover}
                                alt={recommended.name}
                                className="recommended-cover"
                            />
                            <div className="recommended-info">
                                <h3>{recommended.name}</h3>
                                <div className="recommended-meta">
                                    {recommended.genre} • Author: {recommended.author} • Rating: {recommended.review_score}/5
                                </div>
                                <p className="recommended-description">{recommended.description}</p>
                            </div>
                        </Link>
                    </div>
                )}

                {!loading && !error && bookmarks.length > 0 && (
                    <div className="section-group">
                        <h2 className="section-title">More Novels</h2>
                        <div className="bookmark-grid">
                            {bookmarks.map(novel => (
                                <Link
                                    key={novel.novel_id}
                                    to={`/NovelDetail/${novel.novel_id}`}
                                    className="bookmark-card"
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                >
                                    <img
                                        src={novel.cover_image_url || fractureCover}
                                        alt={novel.name}
                                        className="bookmark-cover"
                                    />
                                    <div className="bookmark-info">
                                        <h4>{novel.name}</h4>
                                        <p>{novel.author}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {!loading && !error && novels.length === 0 && (
                    <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>
                        No novels found in the database yet.
                    </p>
                )}
            </div>
        </div>
    );
}
