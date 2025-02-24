export type Category =
  | 'food'
  | 'transport'
  | 'entertainment'
  | 'shopping'
  | 'utilities'
  | 'rent'
  | 'health'
  | 'travel'
  | 'other';

export interface Transaction {
  id: string;
  type: 'expense' | 'income';
  amount: number;
  category: Category;
  description: string;
  date: string;
  currency: string;
}

export interface Budget {
  category: Category;
  amount: number;
  currency: string;
}