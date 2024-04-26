import { StyleSheet, Text, View } from 'react-native';

import { ExpensesSummary } from './ExpensesSummary';
import { ExpensesList } from './ExpensesList';

import { GlobalStyles } from '../../constants/style';

export function ExpensesOutput({ expenses, periodName }) {
  return (
    <View style={styles.container}>
      {expenses.length ? (
        <>
          <ExpensesSummary periodName={periodName} expenses={expenses} />
          <ExpensesList expenses={expenses} />
        </>
      ) : (
        <>
          <Text style={styles.text}>No expenses found.</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    color: GlobalStyles.colors.primary200,
    textAlign: 'center',
    fontSize: 16,
  },
});
