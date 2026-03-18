import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import './Writer.css';

export function StoryManagement() {
    const { storyId } = useParams();
    const navigate = useNavigate();
    const [novel, setNovel] = useState(null);
    const [chapters, setChapters] = useState([]);
    const [chapterZero, setChapterZero] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNovel = async () => {
            try {
                const res = await fetch(`/api/novels/${storyId}`);
                const data = await res.json();
                if (res.ok) {
                    setNovel(data.novel);
                    setChapters(data.chapters);
                    
                    // FRACTURE requested logic for Chapter 0 preview
                    const ch0 = data.chapters.find(c => c.chapter_num === 0);
                    if (ch0) {
                        const contentRes = await fetch(`/api/chapters/${ch0.chapter_id}`);
                        const contentData = await contentRes.json();
                        if (contentRes.ok) setChapterZero(contentData.chapter);
                    }
                }
            } catch (err) {
                console.error("Failed to load story details");
            } finally {
                setLoading(false);
            }
        };

        fetchNovel();
    }, [storyId]);

    if (loading) return <div className="writer-container"><p>Loading Storyboard...</p></div>;
    if (!novel) return <div className="writer-container"><p>Story not found.</p></div>;

    // Isolate a few lines of chapter 0 for the preview
    const previewContent = chapterZero 
        ? chapterZero.content.substring(0, 500) + '...'
        : 'Once upon a time in a world fractured by time...\n\n(Write your intro here)';

    return (
        <div className="writer-container" style={{ display: 'flex', gap: '2rem', height: 'calc(100vh - 100px)', maxWidth: '1400px', margin: '0 auto', paddingTop: '2rem' }}>
            
            {/* LEFT SIDEBAR - Chapters */}
            <div style={{ width: '300px', background: 'var(--bg-card)', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid var(--glass-border)' }}>
                <Link to="/WriterDashboard" style={{ color: 'var(--primary-neon)', textDecoration: 'none', fontWeight: 'bold', marginBottom: '1rem', display: 'inline-block' }}>← Back to My Works</Link>
                
                <h2 style={{ fontSize: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>{novel.name}</h2>
                
                <button 
                    onClick={() => navigate(`/Writer/${storyId}/new`)} 
                    className="btn-primary" 
                    style={{ padding: '0.75rem', width: '100%', borderRadius: '8px' }}
                >
                    + New Chapter
                </button>

                <div className="chapter-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', overflowY: 'auto', flex: 1, marginTop: '1rem' }}>
                    {chapters.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No chapters yet.</p>}
                    {chapters.map((ch) => (
                        <div key={ch.chapter_id} className="chapter-item" style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '140px' }}>{ch.title}</span>
                            <div style={{ display: 'flex', gap: '5px' }}>
                                <button onClick={() => navigate(`/Writer/${storyId}/${ch.chapter_id}`)} style={{ background: 'none', border: '1px solid var(--glass-border)', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>Edit</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* RIGHT MAIN AREA - Storyboard & Preview */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem', overflowY: 'auto' }}>
                
                {/* Whiteboard Placeholder */}
                <div style={{ background: 'var(--bg-card)', borderRadius: '12px', padding: '2rem', minHeight: '300px', border: '1px dashed var(--text-muted)', display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ margin: 0, marginBottom: '1rem', color: 'var(--text-light)' }}>Whiteboard</h3>
                    <div style={{ flex: 1, background: 'rgba(0,0,0,0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                        Write, draw, or drag images here to formulate your ideas...
                    </div>
                </div>

                {/* A4 Preview Area */}
                <div>
                    <h3 style={{ marginBottom: '1rem', color: 'var(--text-light)' }}>Chapter Preview</h3>
                    <div style={{ 
                        background: '#fcfcfc', 
                        color: '#111', 
                        padding: '2rem 3rem', 
                        borderRadius: '4px', 
                        width: '100%', 
                        maxWidth: '800px', 
                        aspectRatio: '1 / 1.414', /* A4 Ratio */
                        boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                        margin: '0 auto',
                        overflow: 'hidden'
                    }}>
                        <div style={{ fontFamily: 'serif', fontSize: '1rem', lineHeight: '1.8' }}>
                            <ReactMarkdown>{previewContent}</ReactMarkdown>
                        </div>
                        <div style={{ textAlign: 'center', marginTop: '2rem', color: '#888', borderTop: '1px dashed #ccc', paddingTop: '1rem', fontStyle: 'italic', fontSize: '0.9rem' }}>
                            Chapter continues in editor...
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
