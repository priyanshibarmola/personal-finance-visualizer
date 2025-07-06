import mongoose from 'mongoose';

const BudgetSchema = new mongoose.Schema({
  amount: Number,
  category: String,
  month: String,
}, {
  timestamps: true,
});

const Budget = mongoose.models.Budget || mongoose.model("Budget", BudgetSchema);

export default Budget;
