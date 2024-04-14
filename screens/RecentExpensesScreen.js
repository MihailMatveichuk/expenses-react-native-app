import { ExpensesOutput } from '../components/ExpensesOutput/ExpensesOutput';
import { expensesData } from '../data/expenses-data';
import { getDateMinusDays } from '../utils/getDateMinusDays';

export function RecentExpensesScreen() {
  const recentExpenses = expensesData.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date > date7DaysAgo;
  });

  return <ExpensesOutput expenses={recentExpenses} periodName="Last 7 days" />;
}
