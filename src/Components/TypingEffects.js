import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const TypingEffect = ({ text = '', speed = 50 }) => {
  const trimmedText = text.trim();
  const [displayedText, setDisplayedText] = useState('');
  const [isFinished, setIsFinished] = useState(false);
  const [replayTrigger, setReplayTrigger] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!trimmedText) return;

    setDisplayedText('');
    setIsFinished(false);
    let index = 0;
    let currentText = '';

    intervalRef.current = setInterval(() => {
      if (index < trimmedText.length) {
        if (trimmedText[index] === '<') {
          const closingIndex = trimmedText.indexOf('>', index);
          if (closingIndex !== -1) {
            currentText += trimmedText.substring(index, closingIndex + 1);
            index = closingIndex + 1;
          } else {
            currentText += trimmedText[index];
            index += 1;
          }
        } else {
          currentText += trimmedText[index];
          index += 1;
        }
        setDisplayedText(currentText);
      } else {
        clearInterval(intervalRef.current);
        setIsFinished(true);
      }
    }, speed);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [trimmedText, speed, replayTrigger]);

  const handleReplay = () => {
    setReplayTrigger(prev => prev + 1);
  };

  const handleSkip = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setDisplayedText(trimmedText);
    setIsFinished(true);
  };

  return (
    <motion.div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        position: 'relative',
        width: 'fit-content'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="typing-effect-container"
    >
      <style>{`
        .typing-effect-container p {
          margin-top: 0.2rem;
          margin-bottom: 0.2rem;
        }
        .replay-button {
          margin-top: 10px;
          padding: 5px 12px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #eee;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.8rem;
          transition: all 0.2s;
          opacity: 0.6;
        }
        .replay-button:hover {
          background: rgba(255, 255, 255, 0.2);
          opacity: 1;
        }
        .typing-controls {
            display: flex;
            gap: 8px;
            margin-top: 10px;
        }
        .control-button {
          padding: 6px 14px;
          background: #4a90e2; /* More visible blue */
          border: none;
          color: white;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.85rem;
          font-weight: 500;
          transition: all 0.2s;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .control-button:hover {
          background: #357abd;
          transform: translateY(-1px);
          box-shadow: 0 4px 6px rgba(0,0,0,0.3);
        }
        .control-button:active {
          transform: translateY(0);
        }
        .skip-button {
            background: #6c757d; /* Gray for skip */
        }
        .skip-button:hover {
            background: #5a6268;
        }
      `}</style>

      <div style={{ position: 'relative', display: 'grid' }}>
        {/* Invisible placeholder to reserve space for the final text */}
        <div
          style={{
            gridArea: '1/1',
            visibility: 'hidden',
            pointerEvents: 'none',
            whiteSpace: 'pre-wrap',
            lineHeight: '1'
          }}
          dangerouslySetInnerHTML={{ __html: trimmedText }}
        />

        {/* Visible typing text overlaid on top */}
        <div style={{ gridArea: '1/1', whiteSpace: 'pre-wrap', position: 'relative', lineHeight: '1' }}>
          <span dangerouslySetInnerHTML={{ __html: displayedText }} />
        </div>
      </div>

      <div className="typing-controls">
        {!isFinished && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="control-button skip-button"
            onClick={handleSkip}
          >
            Skip
          </motion.button>
        )}
        {isFinished && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="control-button replay-button"
            onClick={handleReplay}
          >
            Replay
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default TypingEffect;
