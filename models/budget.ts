import mongoose from 'mongoose';

const BudgetSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Budget =
  mongoose.models.Budget || mongoose.model('Budget', BudgetSchema);

export default Budget;
