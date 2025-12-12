import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { users } from '../data/mockDB';

type RootStackParamList = {
  Login: undefined;
  home: { userName: string };
};

export default function AuthScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [idNumber, setIdNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [welcomeUser, setWelcomeUser] = useState<string | null>(null);

  const toggleSideAndForm = () => {
    const nextTab = activeTab === 'login' ? 'register' : 'login';
    setActiveTab(nextTab);
  };

  const handleLogin = () => {
    if (!idNumber.trim() || !password.trim()) {
      setWelcomeUser('⚠️ يرجى تعبئة جميع الحقول');
      setTimeout(() => setWelcomeUser(null), 2000);
      return;
    }

    const user = users.find(
      (u) => u.national_id === idNumber && u.password === password
    );

    if (user) {
      setWelcomeUser(user.name);
      setTimeout(() => {
        setWelcomeUser(null);
navigation.navigate('home', { userName: user.name });
      }, 2000);
    } else {
      setWelcomeUser('❌ البيانات غير صحيحة');
      setTimeout(() => setWelcomeUser(null), 2000);
    }
  };

  return (
    <View style={styles.page}>
      <Image source={require('../assets/images/logo.png')} style={styles.logo} />

      <View style={styles.blackBox}>
        <Pressable onPress={toggleSideAndForm} style={styles.arrowButton}>
          <FontAwesome
            name={activeTab === 'login' ? 'arrow-right' : 'arrow-left'}
            size={22}
            color="#fff"
          />
        </Pressable>

        <Text style={styles.title}>
          {activeTab === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
        </Text>

        {activeTab === 'login' ? (
          <>
            <TextInput
              placeholder="رقم الهوية الوطنية أو الإقامة"
              placeholderTextColor="#AAA"
              style={styles.input}
              value={idNumber}
              onChangeText={setIdNumber}
            />
            <TextInput
              placeholder="كلمة المرور"
              placeholderTextColor="#AAA"
              secureTextEntry
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />

            <Pressable
              style={({ pressed }) => [
                styles.forgotBox,
                pressed && styles.forgotBoxActive,
              ]}
              onPress={() => {}}
            >
              <Text style={styles.forgotText}>هل نسيت كلمة المرور؟</Text>
            </Pressable>

            <Pressable onPress={handleLogin} style={styles.mainButton}>
              <Text style={styles.buttonText}>دخول</Text>
            </Pressable>

            <View style={styles.nafathBox}>
              <View style={styles.nafathIcon}>
                <FontAwesome name="lock" size={18} color="#fff" />
              </View>
              <Text style={styles.nafathText}>التسجيل من خلال نفاذ</Text>
            </View>
          </>
        ) : (
          <>
            <TextInput
              placeholder="رقم الهوية الوطنية أو الإقامة"
              placeholderTextColor="#AAA"
              style={styles.input}
              value={idNumber}
              onChangeText={setIdNumber}
            />

            <View style={styles.otpRow}>
              <TextInput
                placeholder="رقم الجوال"
                placeholderTextColor="#AAA"
                style={[styles.input, { flex: 2 }]}
                value={mobile}
                onChangeText={setMobile}
              />
              <TextInput
                placeholder="رمز التحقق"
                placeholderTextColor="#AAA"
                style={[styles.input, { flex: 1, marginLeft: 8 }]}
                value={otp}
                onChangeText={setOtp}
              />
              <Pressable style={styles.sendOtpButton}>
                <Text style={{ color: '#fff', fontSize: 12 }}>إرسال رمز</Text>
              </Pressable>
            </View>

            <View style={styles.birthRow}>
              <TextInput
                placeholder="اليوم"
                placeholderTextColor="#AAA"
                style={[styles.input, styles.birthInput]}
                keyboardType="numeric"
                value={day}
                onChangeText={setDay}
              />
              <TextInput
                placeholder="الشهر"
                placeholderTextColor="#AAA"
                style={[styles.input, styles.birthInput]}
                keyboardType="numeric"
                value={month}
                onChangeText={setMonth}
              />
              <TextInput
                placeholder="السنة"
                placeholderTextColor="#AAA"
                style={[styles.input, styles.birthInput]}
                keyboardType="numeric"
                value={year}
                onChangeText={setYear}
              />
            </View>

            <TextInput
              placeholder="كلمة المرور"
              placeholderTextColor="#AAA"
              secureTextEntry
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />
            <TextInput
              placeholder="تأكيد كلمة المرور"
              placeholderTextColor="#AAA"
              secureTextEntry
              style={styles.input}
              value={confirm}
              onChangeText={setConfirm}
            />

            <Pressable style={styles.mainButton}>
              <Text style={styles.buttonText}>تسجيل</Text>
            </Pressable>
          </>
        )}
      </View>

      <Modal
        visible={welcomeUser !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setWelcomeUser(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Image source={require('../assets/images/logo.png')} style={styles.modalLogo} />
            <Text style={styles.modalText}>
              {welcomeUser?.startsWith('❌') || welcomeUser?.startsWith('⚠️')
                ? welcomeUser
                : `مرحباً ${welcomeUser} في وثيقتي الرقمية ✅`}
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#FFFDF8', justifyContent: 'center', alignItems: 'center' },
  logo: { width: 140, height: 140, resizeMode: 'contain', marginBottom: 20 },
  blackBox: {
    width: '80%',
    backgroundColor: 'rgba(0,0,0,0.85)',
    padding: 32,
    justifyContent: 'center',
    borderRadius: 12,
  },
  arrowButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#1A4F3F',
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: 18, color: '#fff', fontWeight: '700', textAlign: 'center', marginBottom: 16 },
  input: {
    backgroundColor: '#1A1A1A',
    color: '#FFF',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    fontSize: 12,
    textAlign: 'right',
    borderWidth: 1,
    borderColor: '#444',
    marginBottom: 10,
  },
  forgotBox: { alignSelf: 'flex-end', marginBottom: 10 },
  forgotBoxActive: { transform: [{ scale: 1.05 }] },
  forgotText: { color: '#AAA', fontSize: 12, textDecorationLine: 'underline' },
  mainButton: {
    backgroundColor: '#1A4F3F',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8,
    alignSelf: 'center',
    width: '60%',
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 13, 
    fontWeight: '600' 
  },
  nafathBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    backgroundColor: '#1A1A1A',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#444',
    alignSelf: 'center',
  },
  nafathIcon: {
    backgroundColor: '#1A4F3F',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  nafathText: { 
    color: '#fff', 
    fontSize: 13, 
    fontWeight: '600' 
  },

  otpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sendOtpButton: {
    backgroundColor: '#1A4F3F',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginLeft: 8,
  },
  birthRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  birthInput: {
    flex: 1,
    marginHorizontal: 4,
  },

  modalOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.5)', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  modalBox: { 
    backgroundColor: '#fff', 
    padding: 24, 
    borderRadius: 12, 
    alignItems: 'center', 
    width: '80%' 
  },
  modalLogo: { 
    width: 80, 
    height: 80, 
    resizeMode: 'contain', 
    marginBottom: 16 
  },
  modalText: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: '#1A4F3F', 
    textAlign: 'center' 
  },
});
