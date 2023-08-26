const {
    addProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById
} = require('../models/product');  // import model functions

exports.createProduct = async (req, res) => {
    try {
        const product = await addProduct(req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await getAllProducts();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateProductByName = async (req, res) => {
    try {
        const productName = req.params.product_name;
        const updatedData = req.body;
        
        const updatedProduct = await productsModel.updateProductByName(productName, updatedData);

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json(updatedProduct);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


// Get a product by Name
const getProductByName = async (productName) => {
    const query = "SELECT * FROM products WHERE product_name = $1";
    const values = [productName];
    const result = await pool.query(query, values);
    return result.rows[0];
};

// Delete a product by Name
const deleteProductByName = async (productName) => {
    const query = "DELETE FROM products WHERE product_name = $1 RETURNING *";
    const values = [productName];
    const result = await pool.query(query, values);
    return result.rows[0];
};
