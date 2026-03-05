import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Writer.css';
import './Auth.css';

export function CreateStory() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, we'd save the story first and get an ID
        navigate('/Writer/new/0');
    };

    return (
        <div className="writer-container">
            <div className="writer-header" style={{ justifyContent: 'center' }}>
                <h1 style={{ color: 'var(--primary-neon)', fontSize: '3rem' }}>Create New Story</h1>
            </div>

            <form className="create-form auth-form" onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" placeholder="Enter story title" required />
                </div>
                <div className="form-group">
                    <label>Genre</label>
                    <select required style={{ background: '#0f172a', border: '1px solid var(--glass-border)', color: 'white', padding: '1rem', borderRadius: '0.75rem', width: '100%' }}>
                        <option>Action</option>
                        <option>Dark Fantasy</option>
                        <option>Sci-Fi</option>
                        <option>Mystery</option>
                        <option>Romance</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        placeholder="What is your story about?"
                        style={{ height: '150px' }}
                    ></textarea>
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%', padding: '1.25rem', fontSize: '1.2rem', marginTop: '2rem' }}>Write Now</button>
            </form>
        </div>
    );
}
