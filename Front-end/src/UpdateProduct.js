import React, { useState } from 'react';
import axios from './axiosConfig';

const UpdateProduct = () => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`/products/${productName}`);
            setResults([response.data]); // Since it returns a single product, wrap it in an array
        } catch (error) {
            console.error("Error searching products:", error.response.data);
        }
    };

    const handleUpdate = async (productId) => {
        try {
            await axios.put(`/products/${productId}`, { price: productPrice });
            alert('Product updated successfully!');
        } catch (error) {
            console.error("Error updating product:", error.response.data);
        }
    };

    return (
        <div>
            <h2>Update Product</h2>
            {/* Search input and button here */}
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
                        <input 
                            type="text"
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                            placeholder="New Price"
                        />
                        <button onClick={() => handleUpdate(product.id)}>Update</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UpdateProduct;
