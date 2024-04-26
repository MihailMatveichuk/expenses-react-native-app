import { useContext } from 'react';

import { ExpensesOutput } from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/contex';
import { getDateMinusDays } from '../utils/getDateMinusDays';

export function RecentExpensesScreen() {
  const { expenses } = useContext(ExpensesContext);

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date > date7DaysAgo;
  });

  return <ExpensesOutput expenses={recentExpenses} periodName="Last 7 days" />;
}
