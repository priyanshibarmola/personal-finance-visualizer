import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

export const connectDB = async () => {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI not found in environment variables");
  }

  if (mongoose.connections[0].readyState) return;

  await mongoose.connect(MONGODB_URI, {
    dbName: 'personal-finance',
  });
};
