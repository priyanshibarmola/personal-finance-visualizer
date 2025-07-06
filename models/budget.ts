import mongoose, { Schema, model, models } from 'mongoose';

const budgetSchema = new Schema(
  {
    amount: Number,
    category: String,
    month: String,
  },
  { timestamps: true }
);

const Budget = models.Budget || model("Budget", budgetSchema);

export default Budget;
