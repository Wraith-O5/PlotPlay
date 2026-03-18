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

            <form className="create-form auth-form" onSubmit={handleSubmit} style={{ marginTop: '2rem', maxWidth: '800px', margin: '2rem auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                
                <div className="form-group" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                    {/* Mock Cover Upload Area */}
                    <div style={{ width: '200px', height: '300px', background: 'var(--bg-dark)', border: '2px dashed var(--glass-border)', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--text-muted)', cursor: 'pointer' }}>
                        <span>+ Upload Cover</span>
                    </div>
                    
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="form-group">
                            <label style={{ color: 'var(--text-light)', fontWeight: 'bold' }}>Book Title</label>
                            <input type="text" placeholder="Enter story title" required style={{ background: '#0f172a', border: '1px solid var(--glass-border)', color: 'white', padding: '1rem', borderRadius: '0.75rem', width: '100%', marginTop: '0.5rem' }} />
                        </div>
                        <div className="form-group">
                            <label style={{ color: 'var(--text-light)', fontWeight: 'bold' }}>Main Genre</label>
                            <select required style={{ background: '#0f172a', border: '1px solid var(--glass-border)', color: 'white', padding: '1rem', borderRadius: '0.75rem', width: '100%', marginTop: '0.5rem' }}>
                                <option value="" disabled selected>Select the primary genre...</option>
                                <option>Action</option>
                                <option>Dark Fantasy</option>
                                <option>Sci-Fi</option>
                                <option>Mystery</option>
                                <option>Romance</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label style={{ color: 'var(--text-light)', fontWeight: 'bold' }}>Description</label>
                    <textarea
                        placeholder="What is your story about?"
                        style={{ height: '200px', background: '#0f172a', border: '1px solid var(--glass-border)', color: 'white', padding: '1rem', borderRadius: '0.75rem', width: '100%', marginTop: '0.5rem', resize: 'vertical' }}
                    ></textarea>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                    <button type="submit" className="btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.2rem', borderRadius: '8px' }}>Create</button>
                </div>
            </form>
        </div>
    );
}
