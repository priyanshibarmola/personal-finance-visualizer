'use client';
import { useState } from 'react';
import useSWR from 'swr';

export default function BudgetForm() {
  const [form, setForm] = useState({
    category: '',
    amount: '',
    month: '',
  });

  const { mutate } = useSWR('/api/budgets');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/budgets', {
      method: 'POST',
      body: JSON.stringify({
        ...form,
        amount: parseFloat(form.amount),
      }),
    });
    mutate?.();
    setForm({ category: '', amount: '', month: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 border p-4 rounded-xl max-w-md mt-6">
      <h2 className="text-xl font-semibold">Set Budget</h2>
      <select name="category" value={form.category} onChange={handleChange}
        className="w-full p-2 border rounded" required>
        <option value="">Select Category</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Utilities">Utilities</option>
        <option value="Shopping">Shopping</option>
        <option value="Other">Other</option>
      </select>
      <input name="amount" type="number" placeholder="Amount" value={form.amount} onChange={handleChange}
        className="w-full p-2 border rounded" required />
      <input name="month" type="month" value={form.month} onChange={handleChange}
        className="w-full p-2 border rounded" required />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full">Set Budget</button>
    </form>
  );
}
