
import Product from "../models/Product.js";

export const createMultipleProducts = async (req, res) => {
    try {
        const ProductArray = req.body; // Expecting an array of Product items in the request body

        // Validate input
        if (!Array.isArray(ProductArray) || ProductArray.length === 0) {
            return next(errorHandler(400, 'Invalid input: ProductArray must be a non-empty array.'));
        }

        // Create Product documents from the provided array
        const Products = ProductArray.map(ProductData => new Product(ProductData));

        // Save all Product documents to the database
        const savedProducts = await Product.insertMany(Products);

        // Return a success response
        res.status(201).json({ success: true, data: savedProducts });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Create a new product
export const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a product by ID
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
