import { useLayoutEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IconButton } from '../ui';
import { GlobalStyles } from '../constants/style';

export function ManageExpensesScreen({ route, navigation }) {
  const expenseId = route.params?.expenseId;

  const isEdiding = !!expenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEdiding ? 'Edit Expense' : 'Add Expense',
    });
  }, [isEdiding, navigation]);

  const deleteExpenseHandler = (id) => {};

  return (
    <View style={styles.container}>
      {isEdiding && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            size={24}
            color={GlobalStyles.colors.error500}
            onPress={deleteExpenseHandler}
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
