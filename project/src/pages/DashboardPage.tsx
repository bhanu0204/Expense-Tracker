import React from 'react';
import { Dashboard } from '../components/Dashboard';
import { useTransactions } from '../hooks/useTransactions';

export function DashboardPage() {
  const { transactions } = useTransactions();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      <Dashboard transactions={transactions} />
    </div>
  );
}