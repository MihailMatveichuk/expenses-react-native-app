import { Pressable, StyleSheet, Text, View } from 'react-native';
import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/native';

import { GlobalStyles } from '../../constants/style';

export function ExpensesItem({ item }) {
  const navigation = useNavigation();
  function expensePressHandler() {
    navigation.navigate('ManageExpensesScreen', { expenseId: item.id });
  }

  return (
    <Pressable
      style={({ pressed }) => pressed && styles.pressed}
      onPress={expensePressHandler}
    >
      <View style={styles.container}>
        <View style={styles.leftPart}>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.date}>
            {dayjs(item.date).format('MMMM D, YYYY')}
          </Text>
        </View>
        <View style={styles.rightPart}>
          <Text style={styles.amount}>${item.amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    marginBottom: 10,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  leftPart: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 5,
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary50,
  },
  date: {
    fontSize: 12,
    color: GlobalStyles.colors.primary50,
  },
  rightPart: {
    minWidth: 80,
    backgroundColor: GlobalStyles.colors.primary50,
    padding: 8,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary700,
  },
  pressed: {
    opacity: 0.75,
  },
});
