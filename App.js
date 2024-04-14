import { StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import {
  AllExpensesScreen,
  ManageExpensesScreen,
  RecentExpensesScreen,
} from './screens';

import { GlobalStyles } from './constants/style';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function ExpensesOverview() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: 'white',
      }}
    >
      <Tab.Screen
        name="Recent expenses"
        component={RecentExpensesScreen}
        options={{
          title: 'Recent expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="history" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="All expenses"
        component={AllExpensesScreen}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All Expenses',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="areachart" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Expenses overview"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Expenses overview" component={ExpensesOverview} />
          <Stack.Screen
            name="Manange expenses"
            component={ManageExpensesScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
