import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

export default function Services() {
  return (
    <View style={styles.page}>
      <Text style={styles.title}>الخدمات الرقمية</Text>

      <Text style={styles.desc}>
        تقدم وثيقتي الرقمية مجموعة من الخدمات الحكومية مثل التجديد التلقائي، إصدار الوثائق،
        التحقق من الصلاحية، وربط الوثائق بالجهات الرسمية.
      </Text>

      <View style={styles.card}>
        <MaterialIcons name="autorenew" size={22} color="#1A4F3F" style={{ marginLeft: 8 }} />
        <Text style={styles.cardText}>التجديد التلقائي للوثائق</Text>
      </View>

      <View style={styles.card}>
        <MaterialIcons name="description" size={22} color="#1A4F3F" style={{ marginLeft: 8 }} />
        <Text style={styles.cardText}>إصدار الوثائق الجديدة</Text>
      </View>

      <View style={styles.card}>
        <MaterialIcons name="verified-user" size={22} color="#1A4F3F" style={{ marginLeft: 8 }} />
        <Text style={styles.cardText}>التحقق من الصلاحية</Text>
      </View>

      <View style={styles.card}>
        <MaterialIcons name="business" size={22} color="#1A4F3F" style={{ marginLeft: 8 }} />
        <Text style={styles.cardText}>ربط الوثائق بالجهات الرسمية</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFFDF8', 
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A4F3F',
    marginBottom: 16,
    textAlign: 'center',
  },
  desc: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  cardText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A4F3F',
    textAlign: 'right',
  },
});
