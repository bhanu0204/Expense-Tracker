import React, { useState } from 'react';
import { TransactionList } from '../components/TransactionList';
import { useTransactions } from '../hooks/useTransactions';
import { Category } from '../types';
import { Search, Filter } from 'lucide-react';

export function TransactionsPage() {
  const { transactions, deleteTransaction } = useTransactions();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<Category | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'expense' | 'income'>('all');

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || transaction.category === categoryFilter;
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Transactions</h1>
      
      <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md"
            />
          </div>
          
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as typeof typeFilter)}
            className="border rounded-md px-3 py-2"
          >
            <option value="all">All Types</option>
            <option value="expense">Expenses</option>
            <option value="income">Income</option>
          </select>
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as Category | 'all')}
            className="border rounded-md px-3 py-2"
          >
            <option value="all">All Categories</option>
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="entertainment">Entertainment</option>
            <option value="shopping">Shopping</option>
            <option value="utilities">Utilities</option>
            <option value="rent">Rent</option>
            <option value="health">Health</option>
            <option value="travel">Travel</option>
            <option value="other">Other</option>
          </select>
        </div>

        <TransactionList
          transactions={filteredTransactions}
          onDelete={deleteTransaction}
        />
      </div>
    </div>
  );
}