import { createContext, useState } from 'react';

import { expensesData } from '../data/expenses-data';

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

export const ExpensesContextProvider = ({ children }) => {
  const [value, setValue] = useState({
    expenses: expensesData,
    addExpense: ({ id, description, amount, date }) => {
      setValue((prev) => ({
        ...prev,
        expenses: [{ id, description, amount, date }, ...prev.expenses],
      }));
    },
    deleteExpense: (id) => {
      setValue((prev) => ({
        ...prev,
        expenses: prev.expenses.filter((expense) => expense.id !== id),
      }));
    },
    updateExpense: (id, { description, amount, date }) => {
      setValue((prev) => ({
        ...prev,
        expenses: prev.expenses.map((expense) =>
          expense.id === id
            ? { ...expense, description, amount, date }
            : expense
        ),
      }));
    },
  });

  console.log(value.expenses.length);

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};
