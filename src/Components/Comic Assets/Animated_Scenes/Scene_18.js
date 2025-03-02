import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LoopingSoundEffects from '../../LoopingSoundEffects';
import './Scene_18.css';
import Scene_18_01 from '../images/18_01.png';
import Scene_18_02 from '../images/18_02(ภาพสั่น).png';
import Scene_18_03 from '../images/18_03(ภาพสั่น).png';
import DoorBanging from '../Sound/Sound Effects/DoorBanging2.mp3'

const Scene_18 = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [showScene18_03, setShowScene18_03] = useState(false);

  useEffect(() => {
    setTimeout(() => setCurrentImage(1), 1000);
    setTimeout(() => {
      setIsShaking(true);
      setShowScene18_03(true);
    }, 3000);
  }, []);

  return (
    <div className="image-slider">
      <div className="background">
        <motion.img
          src={Scene_18_01}
          alt="Scene 18_01"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
          className="background-image"
        />
      </div>

      {currentImage === 1 && (
        <LoopingSoundEffects 
        src={Scene_18_02} 
        alt='Shaking' 
        soundSrc={DoorBanging} 
        className='overlay' 
        motionProps={{initial: { opacity: 0 },animate:{ opacity: 1 },transition:{ duration: 1, ease: 'easeInOut' }}}
      />
      )}

      {isShaking && (
        <>
          {currentImage >= 1 && (
            <LoopingSoundEffects 
              src={Scene_18_02} 
              alt='Shaking' 
              soundSrc={DoorBanging} 
              className='overlay' 
              motionProps={{animate:{ x: [0, 10, -10, 10, -10, 0] },transition:{ duration: 0.5, repeat: Infinity, repeatType: 'loop' }}}
            />
          )}

          {showScene18_03 && (
              <LoopingSoundEffects 
              src={Scene_18_03} 
              alt='Shaking' 
              soundSrc={DoorBanging} 
              className='overlay' 
              motionProps={{animate:{ x: [0, 10, -10, 10, -10, 0] },transition:{ duration: 0.5, repeat: Infinity, repeatType: 'loop' }}}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Scene_18;
