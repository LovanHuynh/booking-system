import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoutes.js';

dotenv.config();

//connectdb
connectDB();
connectCloudinary()

// App config
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// API endpoint
app.use('/api/admin', adminRouter)


app.get('/', (req, res) => {
    res.send('Api Huynh');
});

// Start server
app.listen(port, () => {
    console.log('Server is running on port:', port);
});
