import React from 'react';
import { Link } from 'react-router-dom';
import './Writer.css';
import fractureCover from '../assets/fracture.png';

export function MyWorks() {
    const works = [
        { id: 1, title: "FRACTURE", type: "Novel", status: "Ongoing", chapters: 33, views: "2.4k", cover: fractureCover },
    ];

    return (
        <div className="writer-container">
            <div className="writer-header">
                <h1>My Works</h1>
                <Link to="/CreateStory" className="btn-primary">Create New Story</Link>
            </div>

            <div className="works-grid">
                {works.map(work => (
                    <Link key={work.id} to={`/Writer/${work.id}/0`} className="work-card">
                        <div className="work-card-img">
                            <img src={work.cover} alt={work.title} />
                        </div>
                        <div className="work-card-content">
                            <h3>{work.title}</h3>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{work.type} • {work.status}</p>
                            <div className="work-stats">
                                <span>📖 {work.chapters} Chapters</span>
                                <span>👁️ {work.views} Views</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
