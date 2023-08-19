const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

/**
 * @swagger
 * /products:
 *   get:
 *     description: Retrieve a list of products
 *     responses:
 *       200:
 *         description: List of products
 */
router.get('/', productsController.getAllProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     description: Retrieve a product by its ID
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: integer
 *       required: true
 *       description: ID of the product
 *     responses:
 *       200:
 *         description: Single product
 */
router.get('/:id', productsController.getProductById);

/**
 * @swagger
 * /products:
 *   post:
 *     description: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Created product
 */
router.post('/', productsController.createProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     description: Update a product by its ID
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: integer
 *       required: true
 *       description: ID of the product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Updated product
 */
router.put('/:id', productsController.updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     description: Delete a product by its ID
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: integer
 *       required: true
 *       description: ID of the product
 *     responses:
 *       200:
 *         description: Product deleted
 */
router.delete('/:id', productsController.deleteProduct);

module.exports = router;
