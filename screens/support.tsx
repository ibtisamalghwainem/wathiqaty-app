import { MaterialIcons } from '@expo/vector-icons';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Support() {
  const phoneNumber = '+966532740123';

  const handleCall = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <View style={styles.page}>
      <Text style={styles.title}>الدعم الفني</Text>

      <Text style={styles.desc}>
        فريق الدعم الفني جاهز لمساعدتك في أي وقت. يمكنك الاطلاع على الأسئلة الشائعة أو التواصل معنا مباشرة.
      </Text>

      <View style={styles.contactBox}>
        <MaterialIcons name="email" size={20} color="#1A4F3F" style={{ marginLeft: 6 }} />
        <Text style={styles.contactText}>ibtisamAlGhwainem@gmail.com</Text>
      </View>

      <TouchableOpacity style={styles.contactBox} onPress={handleCall}>
        <MaterialIcons name="phone" size={20} color="#1565C0" style={{ marginLeft: 6 }} />
        <Text style={styles.phoneText}>{phoneNumber}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFDF8',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A4F3F',
    marginBottom: 16,
  },
  desc: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  contactBox: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 12,
    elevation: 2,
    width: '100%',
    maxWidth: 320,
  },
  contactText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A4F3F',
    textAlign: 'right',
  },
  phoneText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1565C0', 
    textAlign: 'right',
  },
});
