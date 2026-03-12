import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Main.css';
import fractureCover from '../assets/fracture.png';

// Import manually to ensure they resolve, then we'll map them
import godDimensions from '../assets/god_dimensions.png';
import blossomRain from '../assets/Blossom Rain.png';

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

    // We'll keep the dynamic recommended from DB, but inject user-requested mock bookmarks for now
    const recommended = novels.length > 0 ? novels[0] : null;

    // Hardcoded requested structure for Bookmarks to emulate Figma Mockup
    const mockBookmarks = [
        {
            id: 'mock-1',
            name: 'The Sword God of Dimensions',
            image: godDimensions,
            readChapters: 150,
            totalChapters: 600,
        },
        {
            id: 'mock-2',
            name: 'Blossom Rain',
            image: blossomRain,
            readChapters: 210,
            totalChapters: 280,
        }
    ];

    return (
        <div className="dashboard-page">
            <div className="dashboard-container">
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
                        <h2 className="section-title" style={{ fontSize: '1.8rem', marginBottom: '1.5rem', marginTop: '1rem' }}>Recommended for You</h2>
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
                                <h3 style={{ fontSize: '1.4rem' }}>{recommended.name.toUpperCase()}</h3>
                                <div className="recommended-meta" style={{ marginTop: '0.5rem', color: 'var(--text-muted)', fontWeight: 'bold' }}>
                                    Genre: {recommended.genre}
                                </div>
                                <p className="recommended-description" style={{ marginTop: '1rem', lineHeight: '1.5' }}>
                                    <strong>Description:</strong> {recommended.description}
                                </p>
                                <div className="recommended-meta" style={{ marginTop: '1rem', fontWeight: 'bold' }}>
                                    Rating: {recommended.review_score}/5
                                </div>
                            </div>
                        </Link>
                    </div>
                )}

                {!loading && !error && (
                    <div className="section-group" style={{ marginTop: '3rem' }}>
                        <h2 className="section-title" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Bookmark</h2>

                        {/* Wrapper for the grey dark rounded container like in mockup */}
                        <div style={{ background: 'var(--bg-card)', borderRadius: '12px', padding: '2rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                            {mockBookmarks.map(bookmark => (
                                <Link
                                    key={bookmark.id}
                                    to={`/NovelDetail/1`} // Routing statically for mock
                                    className="bookmark-card-modern"
                                >
                                    <div className="bookmark-cover-modern">
                                        <img src={bookmark.image} alt={bookmark.name} />
                                    </div>
                                    <div className="bookmark-content-modern">
                                        <h4>{bookmark.name}</h4>
                                        <div className="progress-container">
                                            <div className="progress-bar-bg">
                                                <div
                                                    className="progress-bar-fill"
                                                    style={{ width: `${(bookmark.readChapters / bookmark.totalChapters) * 100}%` }}
                                                ></div>
                                            </div>
                                            <p className="progress-text">
                                                Read {bookmark.readChapters}/{bookmark.totalChapters} Chapters
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
