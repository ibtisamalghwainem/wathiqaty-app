import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import DashboardDocumentsTab from '../screens/DocumentsTab';
import DashboardScreen from '../screens/HomeDashboard';
import DashboardHomeTab from '../screens/HomeTab';
import DashboardNotificationsTab from '../screens/NotificationsTab';
import DashboardUserTab from '../screens/UserTab';

const InnerStack = createNativeStackNavigator();

export default function MainLayoutDashboard() {
  return (
    <InnerStack.Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: false }}>
      <InnerStack.Screen name="Dashboard" component={DashboardScreen} />
      <InnerStack.Screen name="HomeTab" component={DashboardHomeTab} />
      <InnerStack.Screen name="NotificationsTab" component={DashboardNotificationsTab} />
      <InnerStack.Screen name="DocumentsTab" component={DashboardDocumentsTab} />
      <InnerStack.Screen name="UserTab" component={DashboardUserTab} />
    </InnerStack.Navigator>
  );
}
