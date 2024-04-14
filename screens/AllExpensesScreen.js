import React from 'react';
import { ExpensesOutput } from '../components/ExpensesOutput';
import { expensesData } from '../data/expenses-data';

export function AllExpensesScreen() {
  return <ExpensesOutput expenses={expensesData} periodName="Total" />;
}
