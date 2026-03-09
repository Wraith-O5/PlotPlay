import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './NovelDetail.css';
import fractureCover from '../assets/fracture.png';

export function NovelDetail() {
    const { novelId } = useParams();
    const [novel, setNovel] = useState(null);
    const [chapters, setChapters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchNovel = async () => {
            // If no novelId in URL, fall back to novel ID 1
            const id = novelId || 1;
            try {
                const res = await fetch(`/api/novels/${id}`);
                const data = await res.json();
                if (res.ok) {
                    setNovel(data.novel);
                    setChapters(data.chapters);
                } else {
                    setError(data.error || 'Failed to load novel.');
                }
            } catch (err) {
                setError('Network error while loading novel.');
            } finally {
                setLoading(false);
            }
        };

        fetchNovel();
    }, [novelId]);

    if (loading) {
        return (
            <div className="novel-detail-container">
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '4rem' }}>
                    Loading novel...
                </p>
            </div>
        );
    }

    if (error || !novel) {
        return (
            <div className="novel-detail-container">
                <p style={{ color: '#ff6b6b', textAlign: 'center', padding: '4rem' }}>
                    {error || 'Novel not found.'}
                </p>
            </div>
        );
    }

    return (
        <div className="novel-detail-container">
            <div className="novel-header">
                <div className="novel-cover">
                    <img src={novel.cover_image_url || fractureCover} alt={novel.name} />
                </div>
                <div className="novel-info">
                    <h1>{novel.name}</h1>
                    <div className="novel-meta">
                        <span>By <strong>{novel.author}</strong></span>
                        <span className="rating">★ {novel.review_score}</span>
                    </div>
                    <div className="genres">
                        {novel.genre && (
                            <span className="genre-tag">{novel.genre}</span>
                        )}
                    </div>
                    <p className="novel-description">{novel.description}</p>
                    {chapters.length > 0 && (
                        <Link to={`/Reader/${chapters[0].chapter_id}`} className="btn-read-now">
                            Read Now
                        </Link>
                    )}
                </div>
            </div>

            <div className="chapter-list-section">
                <h2>Chapters</h2>
                <div className="chapter-list">
                    {chapters.length === 0 ? (
                        <p style={{ color: 'var(--text-muted)', padding: '1rem 0' }}>
                            No chapters available yet.
                        </p>
                    ) : (
                        chapters.map((chapter) => (
                            <Link
                                key={chapter.chapter_id}
                                to={`/Reader/${chapter.chapter_id}`}
                                className="chapter-item"
                            >
                                <span>{chapter.title}</span>
                                <span style={{ color: 'var(--primary-neon)', fontSize: '1.2rem' }}>→</span>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
