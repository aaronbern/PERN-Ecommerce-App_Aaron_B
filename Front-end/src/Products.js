import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';
import { motion } from 'framer-motion';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

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

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        paddingLeft: 0,
    };

    const productStyle = {
        borderBottom: '3px solid #03045E', 
        padding: '10px 0',
        fontSize: '17px', 
        width: '55%',      
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 0
    };

    const ulStyle = {
        width: '100%',
        listStyleType: 'none',  
        paddingLeft: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
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
        fontWeight: 700
    };

    const fontStyle = {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 400
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
            <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                style={ulStyle}
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
                    } = product;

                    return (
                        <motion.li 
                            whileHover={{ scale: 1.17 }}
                            key={product_id} 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.3 }}
                            style={productStyle}
                        >
                            <h3 style={fontStyle}>{product_name} ({brand}) - ${price}</h3>
                            <p style={fontStyle}>{description}</p>
                            <p style={fontStyle}>Category: {category}</p>
                            <p style={fontStyle}>Quantity: {quantity}</p>
                            <p style={fontStyle}>Rating: {rating}</p>
                            <p style={fontStyle}> {availability ? "Available" : "Out of Stock"}</p>
                        </motion.li>
                    );
                })}
            </motion.ul>
            <div>
                {currentPage > 1 && <button onClick={() => handlePageChange('prev')}>Previous</button>}
                <span padding='15px'>Page {currentPage}</span>
                {products.length > currentPage * itemsPerPage && <button onClick={() => handlePageChange('next')}>Next</button>}
            </div>
        </div>
    );
};

export default Products;
