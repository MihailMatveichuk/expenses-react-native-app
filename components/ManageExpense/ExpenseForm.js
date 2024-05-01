import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { Input } from './Input';
import { Button } from '../../ui';
import { ExpensesContext } from '../../store/contex';

import { GlobalStyles } from '../../constants/style';

export function ExpenseForm({ isEditing, onCancel, onSubmitData }) {
  const route = useRoute();

  const expenseId = route.params?.expenseId;

  const [amountValue, setAmountValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');

  const { expenses } = useContext(ExpensesContext);

  const foundExpense = expenses.find((expense) => expense.id === expenseId);

  const handleAmountChanging = (text) => {
    setAmountValue(text);
  };

  const handleDateChanging = (text) => {
    setDateValue(text);
  };

  const handleDescriptionChanging = (text) => {
    setDescriptionValue(text);
  };

  useEffect(() => {
    if (isEditing) {
      setAmountValue(foundExpense.amount.toString());
      setDateValue(foundExpense.date.toISOString().slice(0, 10));
      setDescriptionValue(foundExpense.description);
    }
  }, [isEditing]);

  const handleSubmit = () => {
    const data = {
      description: descriptionValue,
      amount: +amountValue,
      date: new Date(dateValue),
    };

    onSubmitData(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Expenses</Text>
      <View style={styles.topInputs}>
        <Input
          style={styles.input}
          label="Amount"
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: handleAmountChanging,
            value: amountValue,
          }}
        />
        <Input
          style={styles.input}
          label="Date"
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: handleDateChanging,
            value: dateValue,
          }}
        />
      </View>

      <Input
        label="Description"
        textInputConfig={{
          placeholder: 'Description',
          maxLength: 255,
          multiline: true,
          onChangeText: handleDescriptionChanging,
          autoCorrect: false,
          value: descriptionValue,
        }}
      />

      <View style={styles.editButtonsContainer}>
        <Button style={styles.button} mode={'flat'} onPress={onCancel}>
          Cancel
        </Button>
        <Button onPress={handleSubmit} style={styles.button}>
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary100,
    textAlign: 'center',
    marginVertical: 24,
  },
  topInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  input: {
    flex: 1,
  },
});
