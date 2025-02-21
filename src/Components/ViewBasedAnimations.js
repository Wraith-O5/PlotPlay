import React from "react";
import {motion}  from "framer-motion";

const ViewBasedAnimations = () => {
    return (
        <>
            <div style={{ height: "200vh" }} />
            <motion.div 
                style={{ height: "100vh", background: "black" }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
            />
        </>
    );
};

export default ViewBasedAnimations;