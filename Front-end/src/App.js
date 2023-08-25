import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Products from './Products';
import SearchProduct from './SearchProduct';
import DeleteProduct from './DeleteProduct';
import UpdateProduct from './UpdateProduct';
import CreateProduct from './CreateProduct';

const navVariants = {
    open: {
        x: 0,
        transition: { stiffness: 300, damping: 30 }
    },
    closed: {
        x: "-100%",
        transition: { stiffness: 300, damping: 30 }
    }
};

const arrowStyle = {
    position: 'fixed',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '2em',
    background: '#1D1A39',
    color: '#FFF',
    cursor: 'pointer',
    padding: '10px',
    zIndex: 999,
    borderTopRightRadius: '5px',
    borderBottomRightRadius: '5px',
};

function App() {

    const backgroundColor = useState('#CAF0F8')[0];

    const navRef = useRef(null);
    const mouseOutTimerRef = useRef(null);  // Storing the timer in a useRef
    const [isOpen, setIsOpen] = useState(false); 
    const closeNav = () => {
        setIsOpen(false);
    };

    const delayedCloseNav = () => {
        mouseOutTimerRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 200);
    };

    useEffect(() => {
        const currentNavRef = navRef.current;

        const handleMouseOut = (event) => {
            if (currentNavRef && currentNavRef.contains(event.target)) {
                delayedCloseNav();
            }
        }

        const handleMouseOver = () => {
            clearTimeout(mouseOutTimerRef.current);
        }

        if (currentNavRef) {
            currentNavRef.addEventListener('mouseout', handleMouseOut);
            currentNavRef.addEventListener('mouseover', handleMouseOver);
        }

        return () => {
            if (currentNavRef) {
                currentNavRef.removeEventListener('mouseout', handleMouseOut);
                currentNavRef.removeEventListener('mouseover', handleMouseOver);
            }
        };
    }, []);

    const linkStyle = {
        fontSize: '18px',
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 600,
        color: '#FFF',
        textDecoration: 'none',
        padding: '0px 0',
        margin: '12px 0', 
        display: 'block',
        borderBottom: '2px solid #90E0EF'
    };
    
    return (
        <Router>
            <div 
                style={{ 
                    backgroundColor: backgroundColor,
                    position: 'fixed', 
                    top: 0, 
                    left: 0, 
                    right: 0,
                    bottom: 0,
                    zIndex: -1
                }}
            />
            
            <div 
                style={{ 
                    position: 'fixed', 
                    top: 0, 
                    left: 0, 
                    bottom: 0, 
                    width: '190px', 
                    zIndex: 999 
                }}
                onMouseOver={() => setIsOpen(true)}
            />
            
            {!isOpen && <div onClick={() => setIsOpen(true)} style={arrowStyle}>&rarr;</div>}
                

            <motion.nav
                ref={navRef}
                initial={false}
                animate={isOpen ? "open" : "closed"}
                variants={navVariants}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: '150px',
                    background: '#1D1A39',
                    color: '#FFF',
                    padding: '15px 15px 15px 5px',
                    zIndex: 1000
                }}
            >
                <ul style={{listStyleType: 'none', margin: '4px', padding: '4px'}}>
                    <li><Link to="/" style={linkStyle} onClick={closeNav}>Home</Link></li>
                    <li><Link to="/products" style={linkStyle} onClick={closeNav}>View All Products</Link></li>
                    <li><Link to="/search" style={linkStyle} onClick={closeNav}>Search Product</Link></li>
                    <li><Link to="/update" style={linkStyle} onClick={closeNav}>Update Product</Link></li>
                    <li><Link to="/delete" style={linkStyle} onClick={closeNav}>Delete Product</Link></li>
                    <li><Link to="/create" style={linkStyle} onClick={closeNav}>Create Product</Link></li>
                    <li><Link to="/login" style={linkStyle} onClick={closeNav}>Login</Link></li>
                    <li><Link to="/register" style={linkStyle} onClick={closeNav}>Register</Link></li>
                </ul>
            </motion.nav>

            <Routes>
                <Route path="/" element={<Home bgColor={backgroundColor} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/products" element={<Products />} />
                <Route path="/search" element={<SearchProduct />} />
                <Route path="/update" element={<UpdateProduct />} />
                <Route path="/delete" element={<DeleteProduct />} />
                <Route path="/create" element={<CreateProduct />} /> 
            </Routes>
        </Router>
    );
}

export default App;
