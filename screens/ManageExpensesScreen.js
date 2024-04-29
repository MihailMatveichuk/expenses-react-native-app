import { useLayoutEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button, IconButton } from '../ui';
import { ExpensesContext } from '../store/contex';
import { ExpenseForm } from '../components/ManageExpense';

import { GlobalStyles } from '../constants/style';

export function ManageExpensesScreen({ route, navigation }) {
  const expenseId = route.params?.expenseId;
  console.log('expenseId', expenseId);

  const { deleteExpense, addExpense, updateExpense } =
    useContext(ExpensesContext);

  const isEdiding = !!expenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEdiding ? 'Edit Expense' : 'Add Expense',
    });
  }, [isEdiding, navigation]);

  const deleteExpenseHandler = (id) => {
    deleteExpense(id);
    navigation.goBack();
  };

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler() {
    if (isEdiding) {
      updateExpense(expenseId, {
        description: 'updated two shirts',
        amount: 22.22,
        date: new Date('2024-04-22'),
      });
    } else {
      addExpense({
        id: 'k1',
        description: 'two shirts',
        amount: 22.22,
        date: new Date('2024-04-22'),
      });
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm />
      <View style={styles.editButtonsContainer}>
        <Button style={styles.button} mode={'flat'} onPress={cancelHandler}>
          Cancel
        </Button>
        <Button onPress={confirmHandler} style={styles.button}>
          {isEdiding ? 'Update' : 'Add'}
        </Button>
      </View>

      {isEdiding && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            size={24}
            color={GlobalStyles.colors.error500}
            onPress={() => deleteExpenseHandler(expenseId)}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
  editButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 12,
  },
  button: {
    width: '40%',
  },
});
