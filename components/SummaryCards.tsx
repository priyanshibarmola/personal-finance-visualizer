'use client';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function SummaryCards() {
  const { data, isLoading } = useSWR('/api/transactions', fetcher);

  // ✅ Safe check for both loading and missing data
  if (isLoading || !data) return <p>Loading summary...</p>;

  const total = data.reduce((sum: number, t: any) => sum + t.amount, 0);
  const recent = data.slice(0, 3);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 max-w-5xl">
      <div className="p-4 border rounded-xl shadow">
        <h2 className="font-semibold text-lg">Total Spent</h2>
        <p className="text-2xl font-bold text-red-600">₹{total}</p>
      </div>
      <div className="p-4 border rounded-xl shadow sm:col-span-2">
        <h2 className="font-semibold text-lg mb-2">Recent Transactions</h2>
        <ul className="space-y-1 text-sm">
          {recent.map((t: any) => (
            <li key={t._id} className="flex justify-between border-b pb-1">
              <span>{t.description}</span>
              <span className="text-gray-600">₹{t.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
