import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            // Tùy chọn có thể không cần với mongoose v8+
        });
        console.log(' MongoDB connected');
    } catch (err) {
        console.error(' MongoDB connection error:', err.message);
        process.exit(1); // Thoát app nếu kết nối thất bại
    }
};

export default connectDB;