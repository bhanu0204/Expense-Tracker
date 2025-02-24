import React from 'react';
import { Transaction } from '../types';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
} from 'lucide-react';

interface DashboardProps {
  transactions: Transaction[];
}

export function Dashboard({ transactions }: DashboardProps) {
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const stats = [
    {
      title: 'Total Balance',
      amount: balance,
      icon: DollarSign,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Income',
      amount: totalIncome,
      icon: TrendingUp,
      color: 'bg-green-500',
    },
    {
      title: 'Total Expenses',
      amount: totalExpenses,
      icon: TrendingDown,
      color: 'bg-red-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4"
        >
          <div
            className={`${stat.color} p-3 rounded-full text-white flex items-center justify-center`}
          >
            <stat.icon size={24} />
          </div>
          <div>
            <p className="text-gray-500">{stat.title}</p>
            <p className="text-2xl font-bold">${stat.amount.toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}