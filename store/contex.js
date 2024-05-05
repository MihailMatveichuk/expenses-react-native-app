import { createContext, useState } from 'react';

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  setExpenses: (data) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

export const ExpensesContextProvider = ({ children }) => {
  const [value, setValue] = useState({
    expenses: [],
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
    setExpenses: (data) => {
      setValue((prev) => ({ ...prev, expenses: data.reverse() }));
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

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};
