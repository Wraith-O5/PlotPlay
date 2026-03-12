import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { marked } from "marked";
import TypingEffect from '../Components/TypingEffects';
import './Reader.css';

export function Reader() {
    const { chapterId } = useParams();
    const navigate = useNavigate();

    const [chapter, setChapter] = useState(null);
    const [sectionsContent, setSectionsContent] = useState([]);
    const [allChapters, setAllChapters] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [settings, setSettings] = useState({
        fontSize: 20,
        theme: 'dark' // white, sepia, dark
    });

    useEffect(() => {
        const fetchChapterAndNovel = async () => {
            setLoading(true);
            try {
                // 1. Fetch current chapter
                const chapRes = await fetch(`/api/chapters/${chapterId}`);
                const chapData = await chapRes.json();

                if (!chapRes.ok) {
                    setError(chapData.error || 'Chapter not found');
                    setLoading(false);
                    return;
                }

                setChapter(chapData.chapter);
                setSectionsContent(parseContent(chapData.chapter.content));

                // 2. Fetch all chapters for Next/Prev buttons
                const novelRes = await fetch(`/api/novels/${chapData.chapter.novel_id}`);
                const novelData = await novelRes.json();
                if (novelRes.ok) {
                    setAllChapters(novelData.chapters);
                }

                window.scrollTo(0, 0);
            } catch (error) {
                console.error('Error fetching chapter:', error);
                setError('Network error');
            } finally {
                setLoading(false);
            }
        };

        fetchChapterAndNovel();
    }, [chapterId]);

    const parseContent = (text) => {
        if (!text) return [];
        const parts = [];

        const cleanText = text.replace(/undefined/g, '').replace(/<>\s*/g, '');
        const sections = cleanText.split('===TYPING_START===');

        if (sections[0]) {
            parts.push({ type: 'markdown', content: sections[0] });
        }

        for (let i = 1; i < sections.length; i++) {
            const subParts = sections[i].split('===TYPING_END===');

            if (subParts[0]) {
                parts.push({ type: 'typing', content: subParts[0] });
            }
            if (subParts[1] && subParts[1].trim() !== '') {
                parts.push({ type: 'markdown', content: subParts[1] });
            }
        }
        return parts;
    };

    if (loading) return <div className="reader-container bg-dark"><p style={{ padding: '4rem', textAlign: 'center' }}>Loading chapter...</p></div>;
    if (error || !chapter) return <div className="reader-container bg-dark"><p style={{ padding: '4rem', textAlign: 'center', color: '#ff6b6b' }}>{error}</p></div>;

    // Find Next/Prev logic
    const currentIndex = allChapters.findIndex(c => c.chapter_id === chapter.chapter_id);
    const prevChapter = currentIndex > 0 ? allChapters[currentIndex - 1] : null;
    const nextChapter = currentIndex < allChapters.length - 1 && currentIndex !== -1 ? allChapters[currentIndex + 1] : null;

    return (
        <div className={`reader-container bg-${settings.theme}`} style={{ fontSize: `${settings.fontSize}px` }}>
            <header className="reader-header">
                <Link to={`/NovelDetail/${chapter.novel_id}`} className="back-link">
                    <span>←</span> Back to Novel
                </Link>
                <h2>{chapter.title}</h2>
                <div className="chapter-nav">
                    <button
                        className="nav-btn"
                        disabled={!prevChapter}
                        onClick={() => navigate(`/Reader/${prevChapter.chapter_id}`)}
                    >
                        Prev
                    </button>
                    <button
                        className="nav-btn"
                        disabled={!nextChapter}
                        onClick={() => navigate(`/Reader/${nextChapter.chapter_id}`)}
                    >
                        Next
                    </button>
                </div>
            </header>

            <main className="reader-content">
                {sectionsContent.map((section, idx) => (
                    <div key={idx} className="reader-section">
                        {section.type === 'typing' ? (
                            <TypingEffect text={marked(section.content)} speed={50} />
                        ) : (
                            <ReactMarkdown children={section.content} />
                        )}
                    </div>
                ))}
            </main>

            <footer className="reader-controls">
                <div className="control-group">
                    <span>Size</span>
                    <button className="control-btn" onClick={() => setSettings(s => ({ ...s, fontSize: Math.max(12, s.fontSize - 2) }))}>A-</button>
                    <button className="control-btn" onClick={() => setSettings(s => ({ ...s, fontSize: Math.min(32, s.fontSize + 2) }))}>A+</button>
                </div>
                <div className="control-group">
                    <span>Theme</span>
                    <div className="theme-dots">
                        <div
                            className={`theme-dot dot-white ${settings.theme === 'white' ? 'active' : ''}`}
                            onClick={() => setSettings(s => ({ ...s, theme: 'white' }))}
                        />
                        <div
                            className={`theme-dot dot-sepia ${settings.theme === 'sepia' ? 'active' : ''}`}
                            onClick={() => setSettings(s => ({ ...s, theme: 'sepia' }))}
                        />
                        <div
                            className={`theme-dot dot-dark ${settings.theme === 'dark' ? 'active' : ''}`}
                            onClick={() => setSettings(s => ({ ...s, theme: 'dark' }))}
                        />
                    </div>
                </div>
            </footer>
        </div>
    );
}
