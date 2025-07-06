'use client';
import useSWR from 'swr';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#f87171', '#60a5fa'];

export default function CategoryPieChart() {
  const { data, isLoading } = useSWR('/api/transactions', fetcher);

  if (isLoading) return <p>Loading category chart...</p>;

  const categoryTotals: Record<string, number> = {};

  data?.forEach((t: any) => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
  });

  const chartData = Object.entries(categoryTotals).map(([category, total]) => ({
    category,
    total,
  }));

  return (
    <div className="max-w-xl mt-8">
      <h2 className="text-xl font-semibold mb-2">Category Breakdown</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={chartData} dataKey="total" nameKey="category" outerRadius={100} label>
            {chartData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
