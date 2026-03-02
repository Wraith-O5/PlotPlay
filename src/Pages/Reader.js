import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { marked } from "marked";
import TypingEffect from '../Components/TypingEffects';
import { novelChapters } from '../configs/novelConfig';
import './Reader.css';

export function Reader() {
    const { chapterId } = useParams();
    const navigate = useNavigate();
    const index = parseInt(chapterId) || 0;
    const [sectionsContent, setSectionsContent] = useState([]);
    const [settings, setSettings] = useState({
        fontSize: 20,
        theme: 'dark' // white, sepia, dark
    });

    const chapter = novelChapters[index];

    useEffect(() => {
        const fetchAllSections = async () => {
            if (!chapter) return;
            try {
                const sections = chapter.sections || [{ path: chapter.path, type: chapter.type }];
                const loadedSections = await Promise.all(sections.map(async (sec) => {
                    const response = await fetch(sec.path);
                    const text = await response.text();
                    return { content: cleanMarkdownContent(text), type: sec.type };
                }));
                setSectionsContent(loadedSections);
                window.scrollTo(0, 0);
            } catch (error) {
                console.error('Error fetching chapter sections:', error);
            }
        };
        fetchAllSections();
    }, [chapter]);

    const cleanMarkdownContent = (content) => {
        let cleanContent = content.replace(/undefined/g, '');
        cleanContent = cleanContent.replace(/<>\s*/g, '');
        return cleanContent;
    };

    if (!chapter) return <div className="reader-container bg-dark">Chapter not found</div>;

    return (
        <div className={`reader-container bg-${settings.theme}`} style={{ fontSize: `${settings.fontSize}px` }}>
            <header className="reader-header">
                <Link to="/NovelDetail" className="back-link">
                    <span>←</span> Back to Novel
                </Link>
                <h2>{chapter.title}</h2>
                <div className="chapter-nav">
                    <button
                        className="nav-btn"
                        disabled={index === 0}
                        onClick={() => navigate(`/Reader/${index - 1}`)}
                    >
                        Prev
                    </button>
                    <button
                        className="nav-btn"
                        disabled={index === novelChapters.length - 1}
                        onClick={() => navigate(`/Reader/${index + 1}`)}
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
