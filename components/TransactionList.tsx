'use client';
import useSWR from 'swr';
import { useState } from 'react';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function TransactionList() {
  const { data, mutate, isLoading } = useSWR('/api/transactions', fetcher);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    await fetch('/api/transactions', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });
    mutate();
    setDeletingId(null);
  };

  if (isLoading) return <p>Loading transactions...</p>;

  return (
    <div className="mt-6 max-w-xl">
      <h2 className="text-xl font-semibold mb-2">Transactions</h2>
      <ul className="space-y-2">
        {data?.map((t: any) => (
          <li key={t._id} className="border p-3 rounded flex justify-between items-center">
            <div>
              <p className="font-medium">{t.description}</p>
              <p className="text-sm text-gray-500">{new Date(t.date).toLocaleDateString()} — {t.category}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">₹{t.amount}</span>
              <button
                onClick={() => handleDelete(t._id)}
                className="text-red-600 hover:underline"
                disabled={deletingId === t._id}
              >
                {deletingId === t._id ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
