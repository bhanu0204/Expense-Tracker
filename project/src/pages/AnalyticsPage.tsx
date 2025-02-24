import React from 'react';
import { useTransactions } from '../hooks/useTransactions';
import { Category } from '../types';
import { PieChart as PieChartIcon, BarChart as BarChartIcon, Activity } from 'lucide-react';
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line
} from 'recharts';

export function AnalyticsPage() {
  const { transactions } = useTransactions();

  // Calculate expenses by category
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<Category, number>);

  const totalExpenses = Object.values(expensesByCategory).reduce((a, b) => a + b, 0);

  // Prepare data for pie chart
  const pieChartData = Object.entries(expensesByCategory).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value
  }));

  // Calculate monthly data
  const monthlyData = transactions.reduce((acc, t) => {
    const date = new Date(t.date);
    const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!acc[monthYear]) {
      acc[monthYear] = { income: 0, expenses: 0 };
    }
    
    if (t.type === 'income') {
      acc[monthYear].income += t.amount;
    } else {
      acc[monthYear].expenses += t.amount;
    }
    
    return acc;
  }, {} as Record<string, { income: number; expenses: number }>);

  const monthlyChartData = Object.entries(monthlyData)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, data]) => ({
      month,
      ...data
    }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <PieChartIcon className="text-blue-500" />
            <h2 className="text-xl font-semibold">Expenses by Category</h2>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4 mt-4">
            {Object.entries(expensesByCategory).map(([category, amount]) => (
              <div key={category}>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-700 capitalize">{category}</span>
                  <span className="text-gray-900 font-medium">
                    ${amount.toFixed(2)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{
                      width: `${(amount / totalExpenses) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="text-blue-500" />
            <h2 className="text-xl font-semibold">Monthly Overview</h2>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#82ca9d" name="Income" />
                <Bar dataKey="expenses" fill="#8884d8" name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <BarChartIcon className="text-blue-500" />
            <h2 className="text-xl font-semibold">Income vs Expenses Trend</h2>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="income" 
                  stroke="#82ca9d" 
                  name="Income"
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="#8884d8" 
                  name="Expenses"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}