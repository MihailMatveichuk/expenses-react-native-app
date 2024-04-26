import { useContext } from 'react';

import { ExpensesOutput } from '../components/ExpensesOutput';
import { ExpensesContext } from '../store/contex';

export function AllExpensesScreen() {
  const { expenses } = useContext(ExpensesContext);

  return <ExpensesOutput expenses={expenses} periodName="Total" />;
}
