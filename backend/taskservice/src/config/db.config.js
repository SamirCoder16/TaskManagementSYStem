import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected to ${connect.connection.host}`);
    } catch (error) {
        console.log('Database connection failed:', error);
        process.exit(1); // Exit the process with failure
    }
}

export default connectDB;