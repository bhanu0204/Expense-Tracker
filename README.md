# Expense-Tracker
It is an application that helps users record, categorize, and analyze their spending habits. It allows users to input expenses, set budgets, track income, and generate reports to manage finances effectively. Typically, it includes features like charts, expense filtering, and recurring transaction management.

![Expense Tracker Screenshot](https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1200)

## Features

-  Interactive dashboard with financial overview
- Track both income and expenses
- Categorize transactions
- Visual analytics with charts and graphs
- Search and filter transactions
- Multi-currency support

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm (v9 or higher)

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd expense-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit the local server URL provided in the terminal.

## Project Structure

```
src/
├── components/        # Reusable UI components
├── pages/            # Page components
├── hooks/            # Custom React hooks
├── types/            # TypeScript type definitions
├── App.tsx           # Main application component
└── main.tsx         # Application entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Using the Application

1. **Dashboard**
   - View your total balance, income, and expenses
   - Quick overview of your financial status

2. **Add Transaction**
   - Click "Add Transaction" in the navigation
   - Choose between income or expense
   - Fill in amount, category, and description
   - Select currency
   - Submit to save

3. **View Transactions**
   - See all transactions in a list
   - Search by description
   - Filter by category or transaction type
   - Delete transactions as needed

4. **Analytics**
   - View expense distribution by category
   - Track monthly income vs expenses
   - Analyze spending trends over time

## Data Persistence

The application uses localStorage to persist your transaction data. All data is stored locally in your browser.
