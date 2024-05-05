import { useContext, useEffect, useState } from 'react';

import { ExpensesOutput } from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/contex';
import { getDateMinusDays } from '../utils/getDateMinusDays';
import { GETExpenses } from '../api/http';
import { ErrorOverlay, LoadingOverlay } from '../ui';

export function RecentExpensesScreen() {
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

  const recentExpenses = expenses.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date > date7DaysAgo;
  });

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

  return <ExpensesOutput expenses={recentExpenses} periodName="Last 7 days" />;
}
