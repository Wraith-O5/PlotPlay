import React from 'react';
import { Link } from 'react-router-dom';
import './NovelDetail.css';
import { novelChapters } from '../configs/novelConfig';
import fractureCover from '../assets/fracture.png';

export function NovelDetail() {
    // Mock metadata for FRACTURE as seen in mockup
    const novelMetadata = {
        title: "FRACTURE",
        author: "Vividest Taleist",
        rating: 4.8,
        reviews: 2450,
        genres: ["Action", "Dark Fantasy", "Sci-Fi"],
        description: "in the world where the world is in dark chaos before you exist. Will you uphold your sword or abandon it? Explore the shattering dimensions of a world on the brink of collapse.",
        coverUrl: fractureCover
    };

    return (
        <div className="novel-detail-container">
            <div className="novel-header">
                <div className="novel-cover">
                    <img src={novelMetadata.coverUrl} alt={novelMetadata.title} />
                </div>
                <div className="novel-info">
                    <h1>{novelMetadata.title}</h1>
                    <div className="novel-meta">
                        <span>By <strong>{novelMetadata.author}</strong></span>
                        <span className="rating">★ {novelMetadata.rating} ({novelMetadata.reviews} reviews)</span>
                    </div>
                    <div className="genres">
                        {novelMetadata.genres.map(genre => (
                            <span key={genre} className="genre-tag">
                                {genre}
                            </span>
                        ))}
                    </div>
                    <p className="novel-description">{novelMetadata.description}</p>
                    <Link to="/Reader/0" className="btn-read-now">Read Now</Link>
                </div>
            </div>

            <div className="chapter-list-section">
                <h2>Chapters</h2>
                <div className="chapter-list">
                    {novelChapters.map((chapter, index) => (
                        <Link key={index} to={`/Reader/${index}`} className="chapter-item">
                            <span>{chapter.title}</span>
                            <span style={{ color: 'var(--primary-neon)', fontSize: '1.2rem' }}>→</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
