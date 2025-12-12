import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';

export default function Welcome() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.page}>
      <Image source={require('../assets/images/logo.png')} style={styles.logo} />

      <Text style={styles.title}>وثيقتي الرقمية</Text>
      <Text style={styles.subTitle}>خدمة موحدة لإدارة الوثائق الحكومية</Text>

      <View style={styles.menu}>
        <Pressable onPress={() => router.push('/services')} style={styles.menuBtn}>
          <Text style={styles.menuText}>الخدمات</Text>
        </Pressable>

        <Pressable onPress={() => router.push('/support')} style={styles.menuBtn}>
          <Text style={styles.menuText}>الدعم</Text>
        </Pressable>
      </View>

      <Pressable onPress={() => router.push('/login')} style={styles.loginBtn}>
        <Text style={styles.loginText}>تسجيل الدخول / تسجيل</Text>
      </Pressable>

      <Pressable onPress={() => setModalVisible(true)} style={styles.startBtn}>
        <Image source={require('../assets/images/logo.png')} style={styles.startLogo} />
        <Text style={styles.startText}>بدء الخدمة</Text>
      </Pressable>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Image source={require('../assets/images/logo.png')} style={styles.modalLogo} />
            <Text style={styles.modalTitle}>مرحبًا بك في وثيقتي الرقمية</Text>
            <Text style={styles.modalSub}>لا يمكنك بدء الخدمة إلا بعد التسجيل أولاً</Text>

            <Pressable
              onPress={() => {
                setModalVisible(false);
                router.push('/login');
              }}
              style={styles.modalBtn}
            >
              <Text style={styles.modalBtnText}>سجل دخول</Text>
            </Pressable>

            <Pressable onPress={() => setModalVisible(false)} style={styles.closeBtn}>
              <Text style={styles.closeText}>إغلاق</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFDF8' },
  logo: { width: 140, height: 60, resizeMode: 'contain', marginBottom: 20 },
  title: { fontSize: 28, fontWeight: '700', color: '#1A4F3F', marginBottom: 8 },
  subTitle: { fontSize: 18, color: '#145C4A', marginBottom: 20 },
  menu: { flexDirection: 'row', gap: 16, marginBottom: 20 },
  menuBtn: { backgroundColor: '#1A4F3F', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  menuText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  loginBtn: { marginBottom: 20, borderWidth: 1, borderColor: '#1A4F3F', padding: 10, borderRadius: 8 },
  loginText: { color: '#1A4F3F', fontSize: 14, fontWeight: '600' },
  startBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1A4F3F', padding: 14, borderRadius: 12 },
  startLogo: { width: 26, height: 26, resizeMode: 'contain', tintColor: '#FFD700', marginRight: 8 },
  startText: { color: '#fff', fontSize: 16, fontWeight: '700' },

  // Modal styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalBox: { backgroundColor: '#fff', padding: 24, borderRadius: 12, alignItems: 'center', width: '80%' },
  modalLogo: { width: 80, height: 80, resizeMode: 'contain', marginBottom: 16 },
  modalTitle: { fontSize: 22, fontWeight: '700', color: '#1A4F3F', marginBottom: 8, textAlign: 'center' },
  modalSub: { fontSize: 16, color: '#145C4A', marginBottom: 20, textAlign: 'center' },
  modalBtn: { backgroundColor: '#1A4F3F', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8, marginBottom: 12 },
  modalBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  closeBtn: { paddingVertical: 8, paddingHorizontal: 16 },
  closeText: { color: '#1A4F3F', fontSize: 14, fontWeight: '600' },
});
