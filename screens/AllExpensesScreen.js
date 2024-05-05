import { useContext, useEffect, useState } from 'react';

import { ExpensesOutput } from '../components/ExpensesOutput';
import { ExpensesContext } from '../store/contex';
import { GETExpenses } from '../api/http';
import { ErrorOverlay, LoadingOverlay } from '../ui';

export function AllExpensesScreen() {
  const expenses = useContext(ExpensesContext);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getDate = async () => {
      setIsFetching(true);
      try {
        const fetchedExpenses = await GETExpenses();
        expenses.setExpenses(fetchedExpenses);
      } catch (error) {
        setIsError(true);
      }

      setIsFetching(false);
    };

    getDate();
  }, []);

  if (isError) {
    return (
      <ErrorOverlay
        message="Could not fetch expenses"
        onConfitmed={() => setIsError(false)}
      />
    );
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return <ExpensesOutput expenses={expenses.expenses} periodName="Total" />;
}
