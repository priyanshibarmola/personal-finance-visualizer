import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  type: String,
  amount: Number,
  category: String,
  date: String,
}, {
  timestamps: true,
});

const Transaction = mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);

export default Transaction;