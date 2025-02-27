import express from 'express';
import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    createMultipleProducts
} from '../controller/product.controller.js';

const router = express.Router();

router.post('/', createProduct);
router.post('/products/multiple', createMultipleProducts);          // Create a new product
// Create a new product
router.get('/', getAllProducts);          // Get all products
router.get('/:id', getProductById);       // Get a single product by ID
router.put('/:id', updateProduct);        // Update a product by ID
router.delete('/:id', deleteProduct);
// Delete a product by ID

export default router;
