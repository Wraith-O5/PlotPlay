import React from 'react';
import { motion } from "framer-motion";
import HoldingBook from "../images/03_02🔴.png"
import See_ghost from "../images/03_01🔴.png"
import './LoweringBookScene.css'

const LoweringBook = () => {
    return (
        <>

            <div className="comic_image">

                <img src={See_ghost} alt="" className="LowerBookSeeGhost" />

                <div className="comic_moving_image" >
                    <motion.img
                        whileInView={{
                            y: 300
                        }}
                        transition={{ duration: 0.75, delay: 0.4 }}
                        src={HoldingBook} alt="Holding Book" className="book"
                    />
                </div>
                <div className="rectangle" />
            </div>
        </>
    );
};

export default LoweringBook;