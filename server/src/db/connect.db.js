import mongoose from 'mongoose';
// import { ErrorHandler } from '../middlewares/errorHandler.js';
import { MONGODB_URI } from '../../constants.js';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1); 
  }
};

export default connectDB;
