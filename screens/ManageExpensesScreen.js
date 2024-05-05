import { useLayoutEffect, useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { ErrorOverlay, IconButton, LoadingOverlay } from '../ui';
import { ExpensesContext } from '../store/contex';
import { ExpenseForm } from '../components/ManageExpense';
import { DELETEExpense, POSTExpense, UPDATEExpense } from '../api/http';

import { GlobalStyles } from '../constants/style';

export function ManageExpensesScreen({ route, navigation }) {
  const expenseId = route.params?.expenseId;

  const { deleteExpense, updateExpense, addExpense } =
    useContext(ExpensesContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);

  const isEditing = !!expenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [isEditing, navigation]);

  const deleteExpenseHandler = async (id) => {
    setIsSubmitting(true);
    try {
      await DELETEExpense(id);
      deleteExpense(id);
      navigation.goBack();
    } catch (error) {
      setIsError(true);
      setIsSubmitting(false);
    }
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async (data) => {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        await UPDATEExpense(expenseId, data);
        updateExpense(expenseId, data);
      } else {
        const id = await POSTExpense(data);
        addExpense({ id: id, ...data });
      }
      navigation.goBack();
    } catch (error) {
      setIsError(true);
      setIsSubmitting(false);
    }
  };

  if (isError) {
    return (
      <ErrorOverlay
        message="Could not save the expense"
        onConfitmed={() => setIsError(false)}
      />
    );
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
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
