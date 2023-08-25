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

exports.getProductById = async (req, res) => {
    try {
        const product = await getProductById(req.params.product_id);
        if (!product) {
            res.status(404).json({ message: "Product not found." });
            return;
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateProductById = async (req, res) => {
    try {
        const product = await updateProductById(req.params.product_id, req.body);
        if (!product) {
            res.status(404).json({ message: "Product not found." });
            return;
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteProductById = async (req, res) => {
    try {
        const product = await deleteProductById(req.params.product_id);
        if (!product) {
            res.status(404).json({ message: "Product not found." });
            return;
        }
        res.status(200).json({ message: "Product deleted successfully." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
