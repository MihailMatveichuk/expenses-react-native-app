import { View, Text, StyleSheet } from 'react-native';
import { GlobalStyles } from '../constants/style';
import { Button } from './Button';

export function ErrorOverlay({ message, onConfitmed }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occured</Text>
      <Text style={[styles.text, styles.message]}>{message}</Text>
      <Button onPress={onConfitmed}>Okay</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    textAlign: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary200,
    textAlign: 'center',
    marginVertical: 24,
  },
  message: {
    fontSize: 16,
    color: GlobalStyles.colors.primary100,
  },
});
