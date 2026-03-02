import './Novel.css'
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { marked } from "marked";
import TypingEffect from '../Components/TypingEffects';
import { novelChapters } from '../configs/novelConfig';

export function Novel() {
  const [chaptersData, setChaptersData] = useState([]);

  useEffect(() => {
    const fetchChapters = async () => {
      const data = await Promise.all(
        novelChapters.map(async (chapter) => {
          try {
            const response = await fetch(chapter.path);
            const content = await response.text();
            return { ...chapter, content: cleanMarkdownContent(content) };
          } catch (error) {
            console.error(`Error loading chapter ${chapter.title}:`, error);
            return { ...chapter, content: '' };
          }
        })
      );
      setChaptersData(data);
    };

    fetchChapters();
  }, []);

  const cleanMarkdownContent = (content) => {
    let cleanContent = content.replace(/undefined/g, '');
    cleanContent = cleanContent.replace(/<>\s*/g, '');
    return cleanContent;
  };

  return (
    <div className="chapter">
      <motion.div>
        {chaptersData.map((chapter, index) => {
          if (chapter.type === 'typing') {
            return <TypingEffect key={index} text={marked(chapter.content)} speed={100} />;
          } else {
            return <ReactMarkdown key={index} children={chapter.content} />;
          }
        })}
      </motion.div>
    </div>
  )
}

