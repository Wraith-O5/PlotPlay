import React from 'react';
import { Link } from 'react-router-dom';
import './Main.css';
import fractureCover from '../assets/fracture.png';
import godDimensionsCover from '../assets/god_dimensions.png';
import treasureHunterCover from '../assets/treasure_hunter.png';

export function Dashboard() {
    const recommended = {
        title: "FRACTURE",
        genres: "Action, Dark Fantasy, Sci-Fi",
        author: "Vividest Taleist",
        description: "Description: in the world where the world is in dark chaos before you exist. Will you uphold your sword or abandon it?",
        rating: "4.8/5",
        cover: fractureCover
    };

    const bookmarks = [
        { id: 1, title: "The Seven-Fold God of Dimensions", chapters: 33, cover: godDimensionsCover },
        { id: 2, title: "Treasure Hole", chapters: 22, cover: treasureHunterCover }
    ];

    return (
        <div className="dashboard-page">
            <div className="dashboard-container">
                <div className="dashboard-header-simple">
                    <button className="btn-toggle-main active">Read</button>
                    <button className="btn-toggle-main">Write</button>
                </div>

                <div className="section-group">
                    <h2 className="section-title">Recommended for You</h2>
                    <Link to="/NovelDetail" className="recommended-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <img src={recommended.cover} alt={recommended.title} className="recommended-cover" />
                        <div className="recommended-info">
                            <h3>{recommended.title}</h3>
                            <div className="recommended-meta">
                                {recommended.genres} • Author: {recommended.author} • Rating: {recommended.rating}
                            </div>
                            <p className="recommended-description">{recommended.description}</p>
                        </div>
                    </Link>
                </div>

                <div className="section-group">
                    <h2 className="section-title">Bookmark</h2>
                    <div className="bookmark-grid">
                        {bookmarks.map(b => (
                            <div key={b.id} className="bookmark-card">
                                <img src={b.cover} alt={b.title} className="bookmark-cover" />
                                <div className="bookmark-info">
                                    <h4>{b.title}</h4>
                                    <p>Read {b.chapters} Chapters</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
