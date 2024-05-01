import { useLayoutEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import uuid from 'react-native-uuid';

import { IconButton } from '../ui';
import { ExpensesContext } from '../store/contex';
import { ExpenseForm } from '../components/ManageExpense';

import { GlobalStyles } from '../constants/style';

export function ManageExpensesScreen({ route, navigation }) {
  const expenseId = route.params?.expenseId;

  const { deleteExpense, updateExpense, addExpense } =
    useContext(ExpensesContext);

  const isEditing = !!expenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [isEditing, navigation]);

  const deleteExpenseHandler = (id) => {
    deleteExpense(id);
    navigation.goBack();
  };

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler(data) {
    if (isEditing) {
      updateExpense(expenseId, data);
    } else {
      addExpense({ id: uuid.v4(), ...data });
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        isEditing={isEditing}
        onCancel={cancelHandler}
        onSubmitData={confirmHandler}
      />

      {isEditing && (
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
});
