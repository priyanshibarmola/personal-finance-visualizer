'use client';
import useSWR from 'swr';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ExpenseChart() {
  const { data, isLoading } = useSWR('/api/transactions', fetcher);

  if (isLoading) return <p>Loading chart...</p>;

  const monthlyTotals: Record<string, number> = {};

  data?.forEach((t: any) => {
    const date = new Date(t.date);
    const key = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    monthlyTotals[key] = (monthlyTotals[key] || 0) + t.amount;
  });

  const chartData = Object.entries(monthlyTotals).map(([month, total]) => ({
    month,
    total,
  }));

  return (
    <div className="max-w-xl mt-8">
      <h2 className="text-xl font-semibold mb-2">Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
