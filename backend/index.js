import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';


import productRouter from './dRoute/product.route.js'
import authRouter from './dRoute/auth.route.js'
import feedBackRoute from './dRoute/feedback.route.js'
import OrderRoute from './dRoute/order.route.js'
import AdminRoute from './dRoute/admin.route.js'
import uploadRoute from './dRoute/upload.route.js'
import conectToDB from './config/db.js';
import { StartBot } from './config/bot.js';

const app = express();
dotenv.config();
app.use(cookieParser());

// Connect to the database
conectToDB()
StartBot()

// Get the absolute path to our backend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
app.use('/api/product', productRouter);
app.use('/api/auth', authRouter);
app.use('/api/feedback', feedBackRoute);
app.use('/api/order', OrderRoute);
app.use('/api/admin', AdminRoute);
app.use('/api/upload', uploadRoute)




// Serve static files from the frontend
app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/dist/index.html'));
});

// Global error handling
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});

// Start the server
app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
