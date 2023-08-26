const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
/**
* @swagger
* /products:
*   get:
*     description: Retrieve all products
*     responses:
*       200:
*         description: List of all products
*/
router.get('/', productsController.getAllProducts);

/**
 * @swagger
 * /products/{product_name}:
 *   get:
 *     description: Retrieve a product by its name
 *     parameters:
 *     - in: path
 *       name: product_name
 *       schema:
 *         type: string
 *       required: true
 *       description: Name of the product
 *     responses:
 *       200:
 *         description: Single product
 */
router.get('/:product_name', productsController.getProductByName);

/**
 * @swagger
 * /products/{product_name}:
 *   delete:
 *     description: Delete a product by its name
 *     parameters:
 *     - in: path
 *       name: product_name
 *       schema:
 *         type: string
 *       required: true
 *       description: Name of the product to be deleted
 *     responses:
 *       200:
 *         description: Product deleted
 */
router.delete('/:product_name', productsController.deleteProductByName);

/**
 * @swagger
 * /products/{product_name}:
 *   put:
 *     description: Update a product by its name
 *     parameters:
 *     - in: path
 *       name: product_name
 *       schema:
 *         type: string
 *       required: true
 *       description: Name of the product to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_name:
 *                 type: string
 *               price:
 *                 type: 
 *                  number 200:
 *         description: Updated product
 */
router.put('/:product_name', productsController.updateProductByName);

module.exports = router;
