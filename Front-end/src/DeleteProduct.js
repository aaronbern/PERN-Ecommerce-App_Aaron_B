import React, { useState } from 'react';
import axios from './axiosConfig';

const DeleteProduct = () => {
    const [productName, setProductName] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`/products/${productName}`);
            setResults([response.data]); // Since it returns a single product, wrap it in an array
        } catch (error) {
            console.error("Error searching products:", error.response.data);
        }
    };

    const handleDelete = async (productId) => {
        try {
            await axios.delete(`/products/${productId}`);
            alert('Product deleted successfully!');
            // Refresh results after deletion
            handleSearch();
        } catch (error) {
            console.error("Error deleting product:", error.response.data);
        }
    };

    return (
        <div>
            <h2>Delete Product</h2>
            
            {/* Search input and button */}
            <input 
                type="text" 
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Product Name"
            />
            <button onClick={handleSearch}>Search</button>
            
            <ul>
                {results.map(product => (
                    <li key={product.id}>
                        <h3>{product.product_name}</h3>
                        <button onClick={() => handleDelete(product.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DeleteProduct;
