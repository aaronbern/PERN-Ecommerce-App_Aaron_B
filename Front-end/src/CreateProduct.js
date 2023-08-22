import React, { useState } from 'react';
import axios from './axiosConfig';

const CreateProduct = () => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [expirationDate, setExpirationDate] = useState('');

    const handleCreate = async () => {
        // Basic form validation
        if (!productName || !productPrice || !expirationDate) {
            alert('All fields are required!');
            return;
        }
    
        if (parseFloat(productPrice) <= 0) {
            alert('Please enter a valid price.');
            return;
        }
    
        const today = new Date().toISOString().split('T')[0];
        if (expirationDate <= today) {
            alert('Please select a future expiration date.');
            return;
        }
    
        try {
            const response = await axios.post('/products', {
                product_name: productName,
                price: productPrice,
                expiration_date: expirationDate
            });
            
            // Log the response
            console.log("Server Response:", response.data);
    
            alert('Product created successfully!');
    
            // Clear form
            setProductName('');
            setProductPrice('');
            setExpirationDate('');
        } catch (error) {
            console.error("Error creating product:", error);
            
            // Check for response from server
            if (error.response && error.response.data) {
                alert(`Error: ${error.response.data.message || 'An error occurred.'}`);
            } else {
                alert('An unknown error occurred.');
            }
        }
    };
    

    return (
        <div>
            <h2>Create Product</h2>
            <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Product Name" />
            <input type="text" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} placeholder="Product Price" />
            <input type="date" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} placeholder="Expiration Date" />
            <button onClick={handleCreate}>Create</button>
        </div>
    );
};

export default CreateProduct;
