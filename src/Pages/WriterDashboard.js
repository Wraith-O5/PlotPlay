import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './WriterDashboard.css';
import fractureCover from '../assets/fracture.png';

export function WriterDashboard() {
    const [works, setWorks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchWorks = async () => {
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
                let fetchedWorks = [];
                if (res.ok) {
                    fetchedWorks = data.novels;
                } else {
                    setError(data.error || 'Failed to load your works.');
                }

                // ECHO USER MOCK LOGIC (No DB modification)
                if (user.username === 'Echo') {
                    const echoRes = await fetch(`/api/writers/1/novels`);
                    const echoData = await echoRes.json();
                    if (echoRes.ok && echoData.novels) {
                        const fractureMock = echoData.novels.find(n => n.name === 'The Neon Void' || n.name === 'FRACTURE');
                        if (fractureMock && !fetchedWorks.find(w => w.novel_id === fractureMock.novel_id)) {
                            // Ensure the name is displayed as FRACTURE as requested
                            fractureMock.name = 'FRACTURE';
                            fetchedWorks.push(fractureMock);
                        }
                    }
                }

                setWorks(fetchedWorks);
            } catch (err) {
                setError('Network error while loading your works.');
            } finally {
                setLoading(false);
            }
        };

        fetchWorks();
    }, []);

    return (
        <div className="writer-dashboard-container">
            <div className="writer-dashboard-actions">
                <Link to="/MyWorks" className="btn-action btn-continue-writing">
                    Continue Writing
                </Link>
                <Link to="/CreateStory" className="btn-action btn-create-story">
                    Create New Story
                </Link>
            </div>

            <div className="writer-dashboard-works">
                <h2>My Work</h2>
                {loading && (
                    <p style={{ color: 'var(--text-muted)' }}>Loading your works...</p>
                )}
                {error && (
                    <p style={{ color: '#ff6b6b' }}>{error}</p>
                )}
                {!loading && !error && works.length === 0 && (
                    <p style={{ color: 'var(--text-muted)' }}>You haven't created any stories yet.</p>
                )}
                {!loading && !error && works.length > 0 && (
                    <div className="works-cover-grid">
                        {works.map(work => (
                            <Link
                                key={work.novel_id}
                                to={`/StoryManagement/${work.novel_id}`}
                                className="work-cover-card"
                            >
                                <img src={work.cover_image_url || fractureCover} alt={work.name} />
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
