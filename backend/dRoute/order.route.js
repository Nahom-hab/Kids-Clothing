import express from 'express';
import { createOrder, deleteOrder, getAllOrders, getOrderById, updateOrder } from '../controller/order.controller.js';
import { sendMessage } from '../controller/sendmessage.controller.js';

const router = express.Router();

router.post('/', createOrder);          // Create a new order
router.get('/', getAllOrders);          // Get all orders
router.get('/:id', getOrderById);       // Get a single order by ID
router.put('/:id', updateOrder);        // Update an order by ID
router.delete('/:id', deleteOrder);
router.post('/sendToBot', sendMessage)   // Delete an order by ID

export default router;
