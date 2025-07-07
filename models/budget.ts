import mongoose, { Schema, Document, models } from 'mongoose';

export interface IBudget extends Document {
  amount: number;
  category: string;
  month: string;
  createdAt: Date;
  updatedAt: Date;
}

const BudgetSchema = new Schema<IBudget>(
  {
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    month: { type: String, required: true },
  },
  { timestamps: true }
);

// ✅ Correct Model Export with Type Inference
const Budget = models.Budget as mongoose.Model<IBudget> || mongoose.model<IBudget>('Budget', BudgetSchema);
export default Budget;