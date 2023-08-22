// Home.js
import React from 'react';
import { motion } from 'framer-motion';

const greetingVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 2 } }
};

const Home = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <motion.h1
                initial="hidden"
                animate="visible"
                variants={greetingVariants}
                style={{ fontSize: '2rem', fontWeight: 'bold' }}
            >
                Simple PERN E-Commerce App
            </motion.h1>
        </div>
    );
};

export default Home;
