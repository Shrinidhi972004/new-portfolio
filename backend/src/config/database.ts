import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
    
    await mongoose.connect(mongoURI);
    
    console.log('[OK] MongoDB Connected');
    
    mongoose.connection.on('error', (err) => {
      console.error('[ERROR] MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.warn('[WARN] MongoDB disconnected');
    });
    
  } catch (error) {
    console.error('[ERROR] MongoDB connection failed:', error);
    process.exit(1);
  }
};
