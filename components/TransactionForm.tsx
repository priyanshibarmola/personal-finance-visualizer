// TransactionForm.tsx
'use client';
import { useState } from 'react';
import useSWR from 'swr';

export default function TransactionForm() {
  const [form, setForm] = useState({ amount: '', date: '', description: '', category: '' });
  const { mutate } = useSWR('/api/transactions');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/transactions', {
      method: 'POST',
      body: JSON.stringify({
        ...form,
        amount: parseFloat(form.amount),
        date: new Date(form.date),
      }),
    });
    setForm({ amount: '', date: '', description: '', category: '' });
    mutate(); // ⬅️ re-fetch updated data
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 border p-4 rounded-xl max-w-md">
      <input name="amount" type="number" placeholder="Amount" value={form.amount} onChange={handleChange}
        className="w-full p-2 border rounded" required />
      <input name="date" type="date" value={form.date} onChange={handleChange}
        className="w-full p-2 border rounded" required />
      <input name="description" placeholder="Description" value={form.description} onChange={handleChange}
        className="w-full p-2 border rounded" required />
      <select name="category" value={form.category} onChange={handleChange}
        className="w-full p-2 border rounded" required>
        <option value="">Select Category</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Utilities">Utilities</option>
        <option value="Shopping">Shopping</option>
        <option value="Other">Other</option>
      </select>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Add Transaction</button>
    </form>
  );
}
