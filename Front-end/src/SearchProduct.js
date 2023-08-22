import React, { useState } from 'react';
import axios from './axiosConfig';

const SearchProduct = () => {
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

    return (
        <div>
            <h2>Search Products</h2>
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
                        <p>Price: ${product.price}</p>
                        <p>Expiration Date: {product.expiration_date}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchProduct;
