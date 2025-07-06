import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema(
  {
    type: String,
    amount: Number,
    category: String,
    date: String,
  },
  { timestamps: true }
);

// Fix for Vercel hot-reloading: check if model exists
const Transaction =
  mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);

export default Transaction;
