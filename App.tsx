import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import AddDocumentScreen from './screens/documentstab';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen
            name="Main"
            component={AppNavigator}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="AddDocument"
            component={AddDocumentScreen}
            options={{ title: 'إضافة وثيقة جديدة' }}
          />
        </Stack.Navigator>
      </NavigationContainer>

      <StatusBar style="auto" />
    </>
  );
}
