import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Category, Transaction } from '../types';

interface TransactionFormProps {
  onSubmit: (transaction: Omit<Transaction, 'id'>) => void;
}

const categories: Category[] = [
  'food',
  'transport',
  'entertainment',
  'shopping',
  'utilities',
  'rent',
  'health',
  'travel',
  'other',
];

const currencies = ['USD', 'EUR', 'GBP', 'JPY'];

export function TransactionForm({ onSubmit }: TransactionFormProps) {
  const [type, setType] = useState<'expense' | 'income'>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>('other');
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState('USD');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      type,
      amount: parseFloat(amount),
      category,
      description,
      date: new Date().toISOString(),
      currency,
    });
    setAmount('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="space-y-4">
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setType('expense')}
            className={`flex-1 py-2 px-4 rounded-md ${
              type === 'expense'
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            Expense
          </button>
          <button
            type="button"
            onClick={() => setType('income')}
            className={`flex-1 py-2 px-4 rounded-md ${
              type === 'income'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            Income
          </button>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="p-2 border rounded-md bg-white"
          >
            {currencies.map((curr) => (
              <option key={curr} value={curr}>
                {curr}
              </option>
            ))}
          </select>
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
          className="w-full p-2 border rounded-md bg-white"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-2 border rounded-md"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 flex items-center justify-center gap-2"
        >
          <PlusCircle size={20} />
          Add {type}
        </button>
      </div>
    </form>
  );
}