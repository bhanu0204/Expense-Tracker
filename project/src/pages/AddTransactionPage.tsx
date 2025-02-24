import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TransactionForm } from '../components/TransactionForm';
import { useTransactions } from '../hooks/useTransactions';

export function AddTransactionPage() {
  const { addTransaction } = useTransactions();
  const navigate = useNavigate();

  const handleSubmit = (transaction: Omit<Transaction, 'id'>) => {
    addTransaction(transaction);
    navigate('/transactions');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Add Transaction</h1>
      <TransactionForm onSubmit={handleSubmit} />
    </div>
  );
}