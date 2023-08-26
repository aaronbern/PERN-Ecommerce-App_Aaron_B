const {
    addProduct,
    getAllProducts,
    getProductByName,
    updateProductByName,
    deleteProductByName
} = require('../models/product'); // import model functions

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
        
        const updatedProduct = await updateProductByName(productName, updatedData);

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json(updatedProduct);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.getProductByName = getProductByName;
exports.deleteProductByName = deleteProductByName;