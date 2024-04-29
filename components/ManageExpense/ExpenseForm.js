import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Input } from './Input';

import { GlobalStyles } from '../../constants/style';

export function ExpenseForm() {
  const handleAmountChanging = () => {
    console.log('amount changing');
  };

  const handleDateChanging = () => {
    console.log('date changing');
  };

  const handleDescriptionChanging = () => {
    console.log('description changing');
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
          }}
        />
        <Input
          style={styles.input}
          label="Date"
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: handleDateChanging,
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
        }}
      />
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

  input: {
    flex: 1,
  },
});
