import { FlatList } from 'react-native';

import { ExpensesItem } from './ExpensesItem';

export function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ExpensesItem item={item} />}
    />
  );
}
