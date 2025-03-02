import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "./Scene_20.css";
import Scene_20_01 from "../images/20_01.png";
import Scene_20_02 from "../images/20_02.png";
import Black_scene from "../images/กระดาษดำ.png";
import SoundEffectsWithAnimation from "../../SoundEffectsWithAnimation";
import ScaryLaugh from "../Sound/Sound Effects/ScaryLaughing.mp3";

const Scene_20 = () => {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [showGhost, setShowGhost] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let interval;
    let transitionCount = 0;

    if (sceneIndex === 0) {
      interval = setInterval(() => {
        setSceneIndex((prev) => (prev === 0 ? 1 : 0));
        transitionCount++;

        if (transitionCount >= 6) {
          clearInterval(interval);
          setSceneIndex(1);
          setTimeout(() => setShowGhost(true), 0);
        }
      }, 300);
    }

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <div className="Comic" ref={containerRef}>
      <img src={sceneIndex === 0 ? Black_scene : Scene_20_01} className="Background" />

      {showGhost && (
        <div className="ComicImage">
          <SoundEffectsWithAnimation
            src={Scene_20_02}
            alt="Scene 20 Ghost"
            soundSrc={ScaryLaugh}
            className="Ghosts"
            motionProps={{
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { duration: 0 },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Scene_20;


