import React from 'react';
import {delay, motion}  from "framer-motion";
import Ghost from "../images/13_02🔴.png"
import Background from "../images/13_01🔴.png"
import Table from '../images/13_03🔴.png'
import './Scene_13.css'

const Scene_13 = () => {
    return (
        <>
            
            <div className="comic_image">
                <div className="comic_moving_image" >
                    <img src={Background} className="Background"/>
                    <img src={Table} className="Table"/>
                    <motion.img 
                        whileInView={{                    
                            y: 500
                        }}
                        transition={{duration: 0.2, delay: 0.4}}
                        src={Ghost} className="ghost"
                        
                    />
                </div>
                <div className="rectangle_top" />
                <div className="rectangle_bottom" />
            </div>
        </>
    );
};

export default Scene_13;