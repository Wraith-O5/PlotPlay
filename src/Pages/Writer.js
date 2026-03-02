import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Writer.css';

export function Writer() {
    const { storyId, chapterId } = useParams();
    const navigate = useNavigate();
    const [content, setContent] = useState('');

    const handleSave = () => {
        alert('Chapter saved!');
        navigate(`/StoryManagement/${storyId}`);
    };

    return (
        <div className="writer-container">
            <div className="writer-header">
                <div>
                    <h1 style={{ color: 'var(--primary-neon)', fontSize: '3rem' }}>Storyboard</h1>
                    <p style={{ color: 'var(--text-muted)' }}>{chapterId === 'new' ? 'Creating New Chapter' : `Editing Chapter ${chapterId}`}</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
                    <button className="btn-primary" onClick={handleSave}>Save</button>
                </div>
            </div>

            <div className="storyboard-container">
                <div className="storyboard-panel">
                    <div className="panel-header">
                        <h3>Chapter</h3>
                    </div>
                    <textarea
                        className="editor-textarea"
                        placeholder="Start writing your masterpiece..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                </div>

                <div className="storyboard-panel">
                    <div className="panel-header">
                        <h3>Whiteboard</h3>
                    </div>
                    <div className="whiteboard-content">
                        This page is not ready yet
                    </div>
                </div>
            </div>
        </div>
    );
}
