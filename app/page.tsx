import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import ExpenseChart from '@/components/ExpenseChart';
import CategoryPieChart from '@/components/CategoryPieChart';
import BudgetChart from '@/components/BudgetChart';
import BudgetForm from '@/components/BudgetForm';
import SummaryCards from '@/components/SummaryCards';

export default function Home() {
  return (
    <main className="p-6 space-y-10">
      <h1 className="text-3xl font-bold">💰 Personal Finance Visualizer</h1>
      <TransactionForm />
      <SummaryCards />
      <TransactionList />
      <ExpenseChart />
      <CategoryPieChart />
      <BudgetForm />
      <BudgetChart />
    </main>
  );
}
