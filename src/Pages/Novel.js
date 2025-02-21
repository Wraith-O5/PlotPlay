import './Novel.css'
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Chapter_0_01 from '../Components/Novel Assets/Documents/Chapter_0/Chapter_0_01.md';
import Chapter_0_02 from '../Components/Novel Assets/Documents/Chapter_0/Chapter_0_02.md';
import Chapter_0_03 from '../Components/Novel Assets/Documents/Chapter_0/Chapter_0_03.md';
import { motion } from 'framer-motion';
import { marked } from "marked";
import TypingEffect from '../Components/TypingEffects';
  
  
export function Novel() {
    const [text, setText] = useState('')
    const [text2, setText2] = useState('');
    const [text3, setText3] = useState('');
    const testText = `
    *Stars by the night sky*,

    *Wind blow by the plain*,

    *Song bring by the animals*,

    *Harmony being born by nature*.

    *It is the harmony of the night under the starry sky*,

    *It is the unforgettable beauty of the world we live in*.

    *It can bring us the strength to live for another day*,

    *It can also bring us back the dream we once had*.
    `;

    useEffect(() => {
        fetch(Chapter_0_01)
        .then((response) => response.text())
        .then((md) => {
            setText(md)
        })
    }, [])

    useEffect(() => {
        // Fetch the markdown file (replace with actual file URL or path)
        fetch(Chapter_0_02)
          .then((response) => response.text())
          .then((data) => {
            const cleanText = cleanMarkdownContent(data);
            setText2(cleanText);
          })
          .catch((error) => console.error('Error fetching markdown file:', error));
      }, []);
    
  
    useEffect(() => {
        fetch(Chapter_0_03)
        .then((response) => response.text())
        .then((data) => setText3(data))
        .catch((error) => console.error("Error loading markdown file:", error));
    }, [])
  ;

  const cleanMarkdownContent = (content) => {
    // Remove undefined and other unwanted parts (you can adjust this based on your needs)
    let cleanContent = content.replace(/undefined/g, ''); // Remove `undefined` strings
    cleanContent = cleanContent.replace(/<>\s*/g, ''); // Remove empty fragments like `<> ... </>`
    
    return cleanContent;
  };

    const htmlText = marked(text2);

    return (
        <div className="chapter">
            <motion.div>
                <ReactMarkdown children={`${text}`} />
                <TypingEffect text={htmlText} speed={100} />
                <ReactMarkdown children={`${text3}`} />
            </motion.div>
            
        </div>
    )
}

