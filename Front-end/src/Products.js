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

    const paginatedProducts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (direction) => {
        if (direction === 'next') {
            setCurrentPage(currentPage + 1);
        } else {
            setCurrentPage(currentPage - 1);
        }
        // Scroll to the top of the window
        window.scrollTo(0, 0);
    };

    return (
        <div>
            <h2>Products</h2>
            <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                {paginatedProducts.map((product, index) => (
                    <motion.li 
                        key={product.id} 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}
                    >
                        <h3>{product.product_name}</h3>
                        <p>Price: ${product.price}</p>
                        <p>Expiration Date: {product.expiration_date}</p>
                    </motion.li>
                ))}
            </motion.ul>
            <div>
                {currentPage > 1 && <button onClick={() => handlePageChange('prev')}>Previous</button>}
                <span>Page {currentPage}</span>
                {products.length > currentPage * itemsPerPage && <button onClick={() => handlePageChange('next')}>Next</button>}
            </div>
        </div>
    );
};

export default Products;
