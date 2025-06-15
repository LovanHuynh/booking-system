import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';

dotenv.config();

//connectdb
connectDB();
connectCloudinary()

// App config
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors()); // ← Không phải app.use(express.cors())

// API endpoint
app.get('/', (req, res) => {
    res.send('Api Huynh');
});

// Start server
app.listen(port, () => {
    console.log('Server is running on port:', port);
});
