import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';
import { motion } from 'framer-motion';
import './Products.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/products');
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error.response.data);
            }
        };

        fetchProducts();
    }, []);

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    const toggleCart = () => {
        setShowCart(!showCart);
    };

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        paddingLeft: 0,
    };

    const truncateText = (text, maxLength = 100) => {
        if (text.length <= maxLength) return text;
        return `${text.substring(0, maxLength)}...`;
    };

    const titleStyle = {
        boxShadow: `
            1px 1px 0px #0077B6,
            2px 2px 0px #0077B6,
            3px 3px 0px #0077B6,
            4px 4px 0px #0077B6,
            5px 5px 0px #0077B6,
            6px 6px 0px #0077B6,
            7px 7px 0px #0077B6,
            8px 8px 0px #0077B6,
            9px 9px 0px #0077B6,
            10px 10px 0px #0077B6
        `,
        backgroundColor: '#03045E',
        color: 'white',
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 700,
        fontSize: '30px'
    };

    const fontStyle = {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 400,
        fontSize: '11px',
        userSelect: 'none',
        pointerEvents: 'none'
    };

    const productGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', // responsive grid
        gap: '20px',
        width: '90%',  
        maxWidth: '1200px', 
        margin: '20px auto'
    };
    
    const productNameStyle = {
        ...fontStyle,
        fontSize: '16px',
        fontWeight: 500,
        userSelect: 'none',
        pointerEvents: 'none'
    };
    
    const productCardStyle = {
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #E0E0E0',
        borderRadius: '10px',
        padding: '10px',
        boxShadow: '0px 0px 15px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s',
        height: '400px',
        cursor: 'pointer'
    };
    
    const imageStyle = {
        width: '100%',
        height: '130px',
        objectFit: 'cover',
        marginBottom: '15px'
    };

    const paginatedProducts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (direction) => {
        if (direction === 'next') {
            setCurrentPage(currentPage + 1);
        } else {
            setCurrentPage(currentPage - 1);
        }
        window.scrollTo(0, 0);
    };

    return (
        <div style={containerStyle}>
            <h2 style={{...titleStyle, padding : '10px', fontSize: '39px', borderBottom: '2px solid #03045E', borderRight: '2px solid #03045E', borderLeft: '2px solid #03045E', borderTop: '2px solid #03045E'}}>Products</h2>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                style={productGridStyle}
            >
                {paginatedProducts.map((product, index) => {
                    const {
                        product_id, 
                        product_name, 
                        price, 
                        description,
                        brand, 
                        category, 
                        quantity, 
                        rating, 
                        availability, 
                        image_url
                    } = product;
    
                    return (
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            key={product_id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            style={productCardStyle}
                        >
                            <img src={image_url} alt="" style={imageStyle} />
                            <h3 style={productNameStyle}>{truncateText(product_name, 50)} ({brand})</h3>
                            <p style={fontStyle}>{truncateText(description, 100)}</p>
                            <p style={fontStyle}>Category: {category}</p>
                            <p style={fontStyle}>Quantity: {quantity}</p>
                            <p style={fontStyle}>Rating: {Array(Math.round(rating)).fill('⭐').join('')}</p> 
                            <p style={fontStyle}>
                                <span>{availability ? "Available" : "Out of Stock"}</span>
                                <span style={{ marginLeft: '20px' }}>${price}</span>
                            </p>
                            <button 
                                className="addToCartButton"
                                onClick={() => addToCart(product)}
                            >
                                Add to Cart
                            </button>
                        </motion.div>
                    );
                })}
            </motion.div>
            <div>
                {currentPage > 1 && <button onClick={() => handlePageChange('prev')}>Previous</button>}
                <span padding='15px'>Page {currentPage}</span>
                {products.length > currentPage * itemsPerPage && <button onClick={() => handlePageChange('next')}>Next</button>}
            </div>
            <div 
                style={{ 
                    position: 'fixed', 
                    top: '10px', 
                    right: '10px', 
                    cursor: 'pointer' 
                }}
                onClick={toggleCart}
            >
                🛒 {cart.length}
            </div>
            {showCart &&
                <div style={{ position: 'fixed', top: '40px', right: '10px', border: '1px solid black', backgroundColor: 'white' }}>
                    {cart.map(item => <div key={item.id}>{item.name}</div>)}
                </div>
            }
        </div>
    );
};

export default Products;
