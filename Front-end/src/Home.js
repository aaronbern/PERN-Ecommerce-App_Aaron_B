import React from 'react';
import { motion } from 'framer-motion';

const greetingVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 2 } }
};

const Home = ({ bgColor }) => {

    return (
        <div style={{ backgroundColor: bgColor, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <motion.h1
                initial="hidden"
                animate="visible"
                variants={greetingVariants}
                style={{fontFamily: 'Montserrat, sans-serif', fontSize: '1.7rem', fontWeight: 'bold' }}
            >
                Welcome to Aaron's Store
            </motion.h1>
        </div>
    );
};

export default Home;
