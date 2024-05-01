import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { GlobalStyles } from '../../constants/style';

export function Input({ label, textInputConfig, style, isValid }) {
  const inputStyles = [
    styles.input,
    textInputConfig.multiline && styles.inputMultiline,
  ];

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[inputStyles, !isValid && styles.inputInvalid]}
        {...textInputConfig}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 3,
    borderRadius: 6,
    fontSize: 18,
    borderColor: 'transparent',
    borderWidth: 1,
  },
  inputInvalid: {
    borderColor: GlobalStyles.colors.error500,
    borderWidth: 1,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
});
