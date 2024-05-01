import React, { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { Input } from './Input';
import { Button } from '../../ui';
import { ExpensesContext } from '../../store/contex';
import { getFormatedDate } from '../../utils/getDateMinusDays';

import { GlobalStyles } from '../../constants/style';

export function ExpenseForm({ isEditing, onCancel, onSubmitData }) {
  const route = useRoute();

  const expenseId = route.params?.expenseId;

  const [amountValue, setAmountValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');

  const [errorObj, setErrorObj] = useState({
    amount: false,
    date: false,
    description: false,
  });

  const { expenses } = useContext(ExpensesContext);

  const foundExpense = expenses.find((expense) => expense.id === expenseId);

  const handleAmountChanging = (text) => {
    setAmountValue(text);
    setErrorObj((prev) => ({ ...prev, amount: false }));
  };

  const handleDateChanging = (text) => {
    setDateValue(text);
    setErrorObj((prev) => ({ ...prev, date: false }));
  };

  const handleDescriptionChanging = (text) => {
    setDescriptionValue(text);
    setErrorObj((prev) => ({ ...prev, description: false }));
  };

  useEffect(() => {
    if (isEditing) {
      setAmountValue(foundExpense.amount.toString());
      setDateValue(getFormatedDate(foundExpense.date));
      setDescriptionValue(foundExpense.description);
    }
  }, [isEditing]);

  const handleSubmit = () => {
    const data = {
      description: descriptionValue.trim(),
      amount: +amountValue,
      date: new Date(dateValue),
    };

    const isAmountValidate = !isNaN(data.amount) && +data.amount > 0;
    const isDateValidate = data.date.toString() !== 'Invalid Date';
    const isDescriptionValidate = data.description.trim().length > 0;

    const handleError = () => {
      setErrorObj({
        amount: !isAmountValidate,
        date: !isDateValidate,
        description: !isDescriptionValidate,
      });
      Alert.alert('Please enter a valid amount, date and description');
    };

    isAmountValidate && isDateValidate && isDescriptionValidate
      ? onSubmitData(data)
      : handleError();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Expenses</Text>
      <View style={styles.topInputs}>
        <View style={styles.inputContainer}>
          <Input
            style={styles.input}
            label="Amount"
            textInputConfig={{
              keyboardType: 'decimal-pad',
              onChangeText: handleAmountChanging,
              value: amountValue,
            }}
            isValid={errorObj.amount}
          />
          {errorObj.amount && (
            <Text style={styles.errorText}>This is not a valid amount</Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Input
            style={styles.input}
            label="Date"
            textInputConfig={{
              placeholder: 'YYYY-MM-DD',
              maxLength: 10,
              onChangeText: handleDateChanging,
              value: dateValue,
            }}
            isValid={errorObj.date}
          />
          {errorObj.date && (
            <Text style={styles.errorText}>This is not a valid date</Text>
          )}
        </View>
      </View>
      <View>
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
          isValid={errorObj.description}
        />
        {errorObj.description && (
          <Text style={styles.errorText}>This field is required</Text>
        )}
      </View>

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
  inputContainer: {
    width: '50%',
    position: 'relative',
  },
  editButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
    marginHorizontal: 12,
  },
  button: {
    width: '40%',
  },

  errorText: {
    color: GlobalStyles.colors.error500,
    position: 'absolute',
    bottom: -10,
    left: 5,
  },
});
