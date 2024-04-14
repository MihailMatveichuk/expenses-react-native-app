import { StyleSheet, View } from 'react-native';

import { ExpensesSummary } from './ExpensesSummary';
import { ExpensesList } from './ExpensesList';
import { GlobalStyles } from '../../constants/style';

export function ExpensesOutput({ expenses, periodName }) {
  return (
    <View style={styles.container}>
      <ExpensesSummary periodName={periodName} expenses={expenses} />
      <ExpensesList expenses={expenses} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
