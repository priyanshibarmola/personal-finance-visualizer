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

// ✅ THIS IS CORRECT
const Budget =
  mongoose.models.Budget || mongoose.model('Budget', BudgetSchema);

// ✅ DEFAULT EXPORT IS REQUIRED
export default Budget;
