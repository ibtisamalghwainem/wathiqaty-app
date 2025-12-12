import { FontAwesome } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Image, Pressable, StyleSheet, Text, View } from 'react-native';

import DashboardDocumentsTab from './DocumentsTab';
import DashboardHomeTab from './HomeDashboard';
import DashboardNotificationsTab from './NotificationsTab';
import DashboardUserTab from './UserTab';

type RootStackParamList = {
  Login: undefined;
  home: { userName: string };
  Welcome: undefined;
};

type HomeRouteProp = RouteProp<RootStackParamList, 'home'>;
type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'home'>;

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState('Home');
  const [hasNewNotifications, setHasNewNotifications] = useState(true);

  const navigation = useNavigation<HomeNavigationProp>();
  const route = useRoute<HomeRouteProp>();
  const userName = route.params?.userName ?? 'مستخدم';

  const slideAnim = useRef(new Animated.Value(300)).current;
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const tabs = [
    { name: 'Home', label: 'الصفحة الرئيسية', icon: 'home' },
    { name: 'Notifications', label: 'التنبيهات', icon: 'bell' },
    { name: 'Documents', label: 'الوثائق', icon: 'file-text' },
    { name: 'User', label: 'المستخدم', icon: 'user' },
  ];

  return (
    <View style={styles.page}>
      <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}>
        <View style={styles.logoBox}>
          <Image source={require('../assets/images/default-logo.png')} style={styles.logo} />
          <Text style={styles.appName}>وثيقتي الرقمية</Text>
        </View>

        <View style={styles.menuBox}>
          {tabs.map(tab => (
            <Pressable
              key={tab.name}
              onPress={() => {
                setActiveTab(tab.name);
                if (tab.name === 'Notifications') {
                  setHasNewNotifications(false); 
                }
              }}
              style={[styles.menuItem, activeTab === tab.name && styles.menuItemActive]}
            >
              <View style={{ position: 'relative' }}>
                <FontAwesome
                  name={tab.icon as any}
                  size={18}
                  color={activeTab === tab.name ? '#AEE2C9' : '#fff'}
                  style={styles.icon}
                />
                {tab.name === 'Notifications' && hasNewNotifications && (
                  <View style={styles.badgeDot} />
                )}
              </View>
              <Text style={styles.menuText}>{tab.label}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.userBox}>
          <Image source={require('../assets/images/user.png')} style={styles.userIcon} />
          <Text style={styles.userName}>{userName}</Text>

          <Pressable
            style={styles.logoutBtn}
            onPress={() => {
              Alert.alert(
                'تأكيد تسجيل الخروج',
                'هل أنت متأكد من تسجيل الخروج؟',
                [
                  { text: 'إلغاء', style: 'cancel' },
                  { text: 'خروج', style: 'destructive', onPress: () => navigation.navigate('Welcome') },
                ],
                { cancelable: true }
              );
            }}
          >
            <FontAwesome name="sign-out" size={18} color="#fff" />
            <Text style={styles.logoutText}>تسجيل خروج</Text>
          </Pressable>
        </View>
      </Animated.View>

      <View style={styles.content}>
        {activeTab === 'Home' && <DashboardHomeTab />}
        {activeTab === 'Notifications' && <DashboardNotificationsTab />}
        {activeTab === 'Documents' && <DashboardDocumentsTab />}
        {activeTab === 'User' && <DashboardUserTab />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, flexDirection: 'row-reverse', backgroundColor: '#F9FAF7' },

  sidebar: {
    width: 240,
    backgroundColor: '#123C34',
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },

  logoBox: {
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#2E6B56',
    width: '70%',
  },
  logo: {
    width: 65,
    height: 55,
    resizeMode: 'contain',
    tintColor: '#fff',
    marginBottom: 4,
  },
  appName: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.5,
  },

  menuBox: { flex: 1, width: '100%', marginTop: 10 },
  menuItem: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 2,
  },
  menuItemActive: {
    backgroundColor: '#2E6B56',
    borderRightWidth: 4,
    borderColor: '#AEE2C9',
  },
  menuText: { color: '#fff', fontSize: 13, fontWeight: '600', marginRight: 10 },
  icon: { marginLeft: 10 },

  badgeDot: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF5252',
    shadowColor: '#FF5252',
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },

  userBox: {
    borderTopWidth: 1,
    borderColor: '#2E6B56',
    paddingTop: 10,
    alignItems: 'center',
  },
  userIcon: { width: 36, height: 36, borderRadius: 18, marginBottom: 4 },
  userName: { color: '#fff', fontSize: 13, fontWeight: '600', marginBottom: 8 },

  logoutBtn: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#2E6B56',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginTop: 6,
  },
  logoutText: { color: '#fff', fontSize: 12, fontWeight: '600', marginRight: 6 },

  content: { flex: 1, padding: 20 },
});
