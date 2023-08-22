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

function App() {
    const [isOpen, setIsOpen] = useState(false);
    const navRef = useRef(null);

    const closeNav = () => setIsOpen(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                closeNav();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <Router>
            <div>
                <button onClick={() => setIsOpen(!isOpen)}>Toggle Menu</button>
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
                        width: '250px',
                        background: '#333',
                        color: '#FFF',
                        padding: '20px'
                    }}
                >
                    <ul>
                        <li>
                            <Link to="/" style={{ color: '#FFF' }} onClick={closeNav}>Home</Link> {/* New Home link */}
                        </li>
                        <li>
                            <Link to="/products" style={{ color: '#FFF' }} onClick={closeNav}>View All Products</Link>
                        </li>
                        <li>
                            <Link to="/search" style={{ color: '#FFF' }} onClick={closeNav}>Search Product</Link>
                        </li>
                        <li>
                            <Link to="/update" style={{ color: '#FFF' }} onClick={closeNav}>Update Product</Link>
                        </li>
                        <li>
                            <Link to="/delete" style={{ color: '#FFF' }} onClick={closeNav}>Delete Product</Link>
                        </li>
                        <li>
                            <Link to="/create" style={{ color: '#FFF' }} onClick={closeNav}>Create Product</Link>
                        </li>
                        <li>
                            <Link to="/login" style={{ color: '#FFF' }} onClick={closeNav}>Login</Link>
                        </li>
                        <li>
                            <Link to="/register" style={{ color: '#FFF' }} onClick={closeNav}>Register</Link>
                        </li>
                    </ul>
                </motion.nav>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/search" element={<SearchProduct />} />
                    <Route path="/update" element={<UpdateProduct />} />
                    <Route path="/delete" element={<DeleteProduct />} />
                    <Route path="/create" element={<CreateProduct />} /> 
                </Routes>
            </div>
        </Router>
    );
}

export default App;
