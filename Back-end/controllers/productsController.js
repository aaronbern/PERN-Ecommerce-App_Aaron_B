const {
    addProduct,
    getAllProducts,
    getProductByName,
    updateProductByName,
    deleteProductByName
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

exports.getProductByName = async (req, res) => {
    try {
        const product = await getProductByName(req.params.product_name);
        if (!product) {
            res.status(404).json({ message: "Product not found." });
            return;
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateProductByName = async (req, res) => {
    try {
        const product = await updateProductByName(req.params.product_name, req.body);
        if (!product) {
            res.status(404).json({ message: "Product not found." });
            return;
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteProductByName = async (req, res) => {
    try {
        const product = await deleteProductByName(req.params.product_name);
        if (!product) {
            res.status(404).json({ message: "Product not found." });
            return;
        }
        res.status(200).json({ message: "Product deleted successfully." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

