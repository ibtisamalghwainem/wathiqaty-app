import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import MainLayoutDashboard from '../layout/MainLayoutDashboard';
import LoginScreen from '../screens/login';
import WelcomeScreen from '../screens/welcome';

// ✅ التبويبات الجديدة
import DocumentsTab from '../screens/DocumentsTab';
import NotificationsTab from '../screens/NotificationsTab';
import ProfileTab from '../screens/UserTab';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// ✅ تبويبات داخل الـ Dashboard
function DashboardTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#1A1A1A' },
        tabBarActiveTintColor: '#FF6A00',
        tabBarInactiveTintColor: '#fff',
      }}
    >
      <Tab.Screen
        name="Documents"
        component={DocumentsTab}
        options={{
          tabBarLabel: 'الوثائق',
          tabBarIcon: ({ color }) => <MaterialIcons name="description" size={22} color={color} />,
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsTab}
        options={{
          tabBarLabel: 'التنبيهات',
          tabBarIcon: ({ color }) => <MaterialIcons name="notifications" size={22} color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileTab}
        options={{
          tabBarLabel: 'الملف الشخصي',
          tabBarIcon: ({ color }) => <MaterialIcons name="person" size={22} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        {/* ✅ هنا نخلي الـ home يفتح التبويبات */}
        <Stack.Screen name="home" component={DashboardTabs} />
        {/* لو تبين نخلي MainLayoutDashboard يشتغل كـ Layout عام */}
        <Stack.Screen name="MainLayout" component={MainLayoutDashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
