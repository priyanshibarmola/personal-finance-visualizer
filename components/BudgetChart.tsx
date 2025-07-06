'use client';
import useSWR from 'swr';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function BudgetChart() {
  const { data: transactions } = useSWR('/api/transactions', fetcher);
  const { data: budgets } = useSWR('/api/budgets', fetcher);

  if (!transactions || !budgets) return <p>Loading budget comparison...</p>;

  const categorySpend: Record<string, number> = {};
  transactions.forEach((t: any) => {
    categorySpend[t.category] = (categorySpend[t.category] || 0) + t.amount;
  });

  const chartData = budgets.map((b: any) => ({
    category: b.category,
    budget: b.amount,
    spent: categorySpend[b.category] || 0,
  }));

  return (
    <div className="max-w-xl mt-8">
      <h2 className="text-xl font-semibold mb-2">Budget vs Spent</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="budget" fill="#22c55e" name="Budget" />
          <Bar dataKey="spent" fill="#ef4444" name="Spent" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
