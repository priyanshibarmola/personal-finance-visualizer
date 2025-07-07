import mongoose, { Schema, Document, models } from 'mongoose';

export interface ITransaction extends Document {
  amount: number;
  category: string;
  type: 'income' | 'expense';
  date: Date;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    type: { type: String, enum: ['income', 'expense'], required: true },
    date: { type: Date, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

// ✅ Critical fix to make .find(), .create() callable in TypeScript
const Transaction = models.Transaction as mongoose.Model<ITransaction> || mongoose.model<ITransaction>('Transaction', TransactionSchema);
export default Transaction;