import { MaterialIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function UserTab() {
  const route = useRoute();
  const [activeTab, setActiveTab] = useState<'journey' | 'requests'>('requests');

  const [requests, setRequests] = useState<
    { id: string; type: string; status: string }[]
  >([]);

  useEffect(() => {
    const newDoc = (route.params as any)?.newDoc;
    if (newDoc) {
      setRequests((prev) => {
        if (prev.find((r) => r.id === newDoc.doc_id)) return prev;
        return [
          ...prev,
          { id: newDoc.doc_id, type: newDoc.type_label, status: 'قيد المعالجة' },
        ];
      });
    }
  }, [route.params]);

  const journeySteps = ['تم الرفع', 'قيد المعالجة', 'تمت الموافقة'];
  const currentStep = 1;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ملف المستخدم</Text>
      <View style={styles.profileCard}>
        <Image source={require('../assets/images/user.png')} style={styles.profileImage} />
        <View>
          <Text style={styles.profileName}>إبتسام</Text>
          <Text style={styles.profileRole}>مستخدم النظام</Text>
        </View>
      </View>

      <View style={styles.tabsRow}>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'requests' && styles.activeTab]}
          onPress={() => setActiveTab('requests')}
        >
          <Text style={[styles.tabText, activeTab === 'requests' && styles.activeTabText]}>
            الطلبات
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'journey' && styles.activeTab]}
          onPress={() => setActiveTab('journey')}
        >
          <Text style={[styles.tabText, activeTab === 'journey' && styles.activeTabText]}>
            رحلة الطلب
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.tabContent}>
        {activeTab === 'requests' && (
          <View>
            {requests.length === 0 ? (
              <Text style={styles.emptyText}>لا توجد طلبات حالياً</Text>
            ) : (
              requests.map((req) => (
                <View key={req.id} style={styles.card}>
                  <Text style={styles.cardText}>الوثيقة رقم {req.id}</Text>
                  <Text style={styles.cardSubText}>نوع الوثيقة: {req.type}</Text>
                  <View style={styles.statusRow}>
                    <MaterialIcons name="hourglass-empty" size={18} color="#1565C0" />
                    <Text style={styles.cardStatus}>الحالة: {req.status}</Text>
                  </View>
                </View>
              ))
            )}
          </View>
        )}

        {activeTab === 'journey' && requests.length > 0 && (
          <View>
            <View style={styles.progressBar}>
              {journeySteps.map((step, index) => (
                <View key={index} style={styles.progressStep}>
                  <View
                    style={[
                      styles.progressCircle,
                      index <= currentStep && styles.progressCircleActive,
                    ]}
                  />
                  <Text
                    style={[
                      styles.progressLabel,
                      index <= currentStep && styles.progressLabelActive,
                    ]}
                  >
                    {step}
                  </Text>
                  {index < journeySteps.length - 1 && (
                    <View
                      style={[
                        styles.progressLine,
                        index < currentStep && styles.progressLineActive,
                      ]}
                    />
                  )}
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EEE', padding: 20 },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 16, textAlign: 'center', color: '#1A4F3F' },
  profileCard: { flexDirection: 'row-reverse', alignItems: 'center', backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 20 },
  profileImage: { width: 50, height: 50, borderRadius: 25, marginLeft: 12 },
  profileName: { fontSize: 16, fontWeight: '600', color: '#1A4F3F' },
  profileRole: { fontSize: 13, color: '#777' },
  tabsRow: { flexDirection: 'row-reverse', marginBottom: 12 },
  tabBtn: { flex: 1, paddingVertical: 10, backgroundColor: '#ccc', borderRadius: 8, marginHorizontal: 4 },
  tabText: { textAlign: 'center', fontSize: 14, fontWeight: '600', color: '#333' },
  activeTab: { backgroundColor: '#1A4F3F' },
  activeTabText: { color: '#fff' },
  tabContent: { flex: 1 },
  progressBar: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', marginVertical: 20 },
  progressStep: { flexDirection: 'row-reverse', alignItems: 'center', flex: 1 },
  progressCircle: { width: 16, height: 16, borderRadius: 8, backgroundColor: '#ccc' },
  progressCircleActive: { backgroundColor: '#1A4F3F' },
  progressLabel: { fontSize: 12, color: '#777', marginHorizontal: 6 },
  progressLabelActive: { color: '#1A4F3F', fontWeight: '700' },
  progressLine: { flex: 1, height: 2, backgroundColor: '#ccc' },
  progressLineActive: { backgroundColor: '#1A4F3F' },
  card: { backgroundColor: '#fff', padding: 14, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#ddd' },
  cardText: { fontSize: 14, fontWeight: '600', color: '#1A4F3F' },
  cardSubText: { fontSize: 13, color: '#666', marginTop: 2 },
  statusRow: { flexDirection: 'row-reverse', alignItems: 'center', marginTop: 6, gap: 6 },
  cardStatus: { fontSize: 13, color: '#1565C0', fontWeight: '600' },
  emptyText: { fontSize: 13, color: '#999', textAlign: 'center', marginTop: 20 },
});
