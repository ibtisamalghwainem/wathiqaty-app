import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';


import MainLayout from '../layout/MainLayout';
import LoginScreen from '../screens/login';
import WelcomeScreen from '../screens/welcome';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="home" component={MainLayout} />
      </Stack.Navigator>
    </NavigationContainer>
);

}
