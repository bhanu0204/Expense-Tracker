import React from 'react';
import { Transaction } from '../types';
import { Trash2 } from 'lucide-react';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export function TransactionList({ transactions, onDelete }: TransactionListProps) {
  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between"
        >
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span
                className={`text-sm font-semibold ${
                  transaction.type === 'expense'
                    ? 'text-red-500'
                    : 'text-green-500'
                }`}
              >
                {transaction.type === 'expense' ? '-' : '+'}
                {transaction.amount} {transaction.currency}
              </span>
              <span className="text-sm text-gray-500">
                {new Date(transaction.date).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-700">{transaction.description}</p>
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {transaction.category}
            </span>
          </div>
          <button
            onClick={() => onDelete(transaction.id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 size={20} />
          </button>
        </div>
      ))}
    </div>
  );
}