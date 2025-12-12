import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import React, { useMemo, useState } from 'react';
import { ActivityIndicator, Modal, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { documents, users } from '../data/mockDB';
import { isExpired, isNearExpiry, isNew } from '../utils/documentHelpers';

type UserTabParams = {
  newDoc: {
    doc_id: string;
    user_id: string;
    type_label: string;
    issue_date: string;
    expiry_date: string;
    uploaded_at: string;
  };
};

const currentUser = users.find((u) => u.user_id === 'u-ibtesam') || users[0];
const GOOGLE_API_KEY = 'AIzaSyCewKD-SmWElAE0qotz0llx86gd7NH9MWA';

type ExtractedFields = {
  type_label: string;
  number?: string;
  issue_date?: string;
  expiry_date?: string;
  place_of_birth?: string;
  rawText?: string;
};

const uriToBase64Web = async (uri: string) => {
  const res = await fetch(uri);
  const blob = await res.blob();
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      const base64 = dataUrl.split(',')[1] || '';
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const uriToBase64Native = async (uri: string) => {
  return FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
};

export default function DocumentsTab() {
  const navigation = useNavigation<NativeStackNavigationProp<{ UserTab: UserTabParams }>>();
  const [filter, setFilter] = useState<'all' | 'near' | 'expired' | 'new' | 'active'>('all');
  const [uploadModal, setUploadModal] = useState(false);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [extracted, setExtracted] = useState<ExtractedFields | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const userDocs = useMemo(() => documents.filter((doc) => doc.user_id === currentUser.user_id), []);
  const stats = {
    total: userDocs.length,
    expired: userDocs.filter((d) => isExpired(d.expiry_date)).length,
    near: userDocs.filter((d) => isNearExpiry(d.expiry_date)).length,
    new: userDocs.filter((d) => isNew(d.uploaded_at)).length,
    active: userDocs.filter((d) => !isExpired(d.expiry_date) && !isNearExpiry(d.expiry_date)).length,
  };

  const filteredDocs = userDocs.filter((doc) => {
    if (filter === 'expired') return isExpired(doc.expiry_date);
    if (filter === 'near') return isNearExpiry(doc.expiry_date);
    if (filter === 'new') return isNew(doc.uploaded_at);
    if (filter === 'active') return !isExpired(doc.expiry_date) && !isNearExpiry(doc.expiry_date);
    return true;
  });

  const getCardStyle = (doc: any) => {
    if (isExpired(doc.expiry_date)) return { bg: '#FFEBEE', btn: '#C62828' };
    if (isNearExpiry(doc.expiry_date)) return { bg: '#FFF3E0', btn: '#E65100' };
    if (isNew(doc.uploaded_at)) return { bg: '#E3F2FD', btn: '#1565C0' };
    return { bg: '#E8F5E9', btn: '#2E7D32' };
  };

  const normalizeFields = (text: string): ExtractedFields => {
    const t = text.replace(/\s+/g, ' ').trim();
    const type_label = /هوية|الهوية/.test(t) ? 'هوية وطنية' : 'وثيقة';
    const number = t.match(/(?:الرقم|رقم)\s*[:\-]?\s*([0-9]{10,})/)?.[1] || t.match(/\b[0-9]{10,}\b/)?.[0];
    const dateRegex = /(\d{2}[\/\-]\d{2}[\/\-]\d{4})/g;
    const dates = t.match(dateRegex) || [];
    const issue_date = t.match(/(?:تاريخ الإصدار|تاريخ الميلاد)\s*[:\-]?\s*(\d{2}[\/\-]\d{2}[\/\-]\d{4})/)?.[1] || dates[0];
    const expiry_date = t.match(/(?:تاريخ الانتهاء|تاريخ انتهاء)\s*[:\-]?\s*(\d{2}[\/\-]\d{2}[\/\-]\d{4})/)?.[1] || dates[1];
    const place_of_birth = t.match(/(?:مكان الميلاد)\s*[:\-]?\s*([^\s]+)/)?.[1];
    return { type_label, number, issue_date, expiry_date, place_of_birth, rawText: text };
  };

  const handleUpload = async () => {
    setErrorMsg(null);
    setLoading(true);
    setStep(1);

    try {
      const result = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: true });
      const asset = result?.assets?.[0];
      if (!asset?.uri) {
        setErrorMsg('لم يتم اختيار ملف.');
        setLoading(false);
        return;
      }

      const mime = asset.mimeType || '';
      if (!mime.startsWith('image/')) {
        setErrorMsg('الملف يجب أن يكون صورة (PNG أو JPG).');
        setLoading(false);
        return;
      }

      setStep(2);
      const base64 =
        Platform.OS === 'web'
          ? await uriToBase64Web(asset.uri)
          : await uriToBase64Native(asset.uri);

      if (!base64 || base64.length < 128) {
        setErrorMsg('تعذر قراءة الصورة. جربي صورة أوضح.');
        setLoading(false);
        return;
      }

      const res = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requests: [{ image: { content: base64 }, features: [{ type: 'DOCUMENT_TEXT_DETECTION' }] }],
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        const code = json?.error?.code;
        const msg = json?.error?.message || 'فشل الاتصال بالخدمة.';
        setErrorMsg(`خطأ الخدمة${code ? ` (${code})` : ''}: ${msg}`);
        setLoading(false);
        return;
      }

      const fullText: string = json?.responses?.[0]?.fullTextAnnotation?.text || '';
      if (!fullText.trim()) {
        setErrorMsg('لم يتم استخراج نص من الوثيقة.');
        setLoading(false);
        return;
      }

      setStep(3);
      setExtracted(normalizeFields(fullText));
      setStep(4);
    } catch {
      setErrorMsg('حدث خطأ أثناء المعالجة.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (!extracted) return;
    const newDoc = {
      doc_id: `doc-${Date.now()}`,
      user_id: currentUser.user_id,
      type_label: extracted.type_label,
      issue_date: extracted.issue_date || '---',
      expiry_date: extracted.expiry_date || '---',
      uploaded_at: new Date().toISOString(),
    };
    navigation.navigate('UserTab', { newDoc });
    setSubmitted(true);
  };

  return (
    <View style={styles.container}>
            {/* شريط الإحصائيات */}
      <View style={styles.statsBar}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>الكل</Text>
          <Text style={styles.statValue}>{stats.total}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>منتهية</Text>
          <Text style={styles.statValue}>{stats.expired}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>قرب انتهاء</Text>
          <Text style={styles.statValue}>{stats.near}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>جديدة</Text>
          <Text style={styles.statValue}>{stats.new}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>سارية</Text>
          <Text style={styles.statValue}>{stats.active}</Text>
        </View>
      </View>

      <View style={styles.filterRow}>
        {[
          { key: 'all', label: 'الكل', color: '#2E6B56' },
          { key: 'near', label: 'قرب انتهاء', color: '#E65100' },
          { key: 'expired', label: 'منتهية', color: '#C62828' },
          { key: 'new', label: 'جديدة', color: '#1565C0' },
          { key: 'active', label: 'سارية', color: '#2E7D32' },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            onPress={() => setFilter(tab.key as any)}
            style={[styles.filterBtn, filter === tab.key && { backgroundColor: tab.color }]}
          >
            <Text style={[styles.filterText, filter === tab.key && styles.filterTextActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {filteredDocs.map((doc) => {
          const style = getCardStyle(doc);
          return (
            <View key={doc.doc_id} style={[styles.card, { backgroundColor: style.bg }]}>
              <View style={styles.cardHeader}>
                <Text style={styles.docTitle}>{doc.type_label}</Text>
                <MaterialIcons name="description" size={20} color={style.btn} />
              </View>
              <Text style={styles.docInfo}>رقم الوثيقة: {doc.doc_id}</Text>
              <Text style={styles.docInfo}>تاريخ الإصدار: {doc.issue_date}</Text>
              <Text style={styles.docInfo}>تاريخ الانتهاء: {doc.expiry_date || 'بدون تاريخ'}</Text>
            </View>
          );
        })}
      </ScrollView>

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => {
          setUploadModal(true);
          setStep(0);
          setExtracted(null);
          setSubmitted(false);
          setErrorMsg(null);
        }}
      >
        <MaterialIcons name="add-circle" size={24} color="#fff" />
        <Text style={styles.addText}>إضافة وثيقة جديدة</Text>
      </TouchableOpacity>

      {uploadModal && (
        <Modal transparent={true} animationType="fade" visible={true}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>رفع وثيقة جديدة</Text>

              <View style={styles.timeline}>
                {['فتح', 'رفع الوثيقة', 'قراءة النص', 'استخراج الحقول', 'جاهز للإرسال'].map((label, idx) => (
                  <View key={idx} style={styles.timelineStep}>
                    <View style={[styles.timelineCircle, idx <= step && { backgroundColor: '#2E7D32' }]}>
                      <Text style={styles.timelineNumber}>{idx + 1}</Text>
                    </View>
                    <Text style={[styles.timelineLabel, idx <= step && { color: '#2E7D32', fontWeight: '700' }]}>
                      {label}
                    </Text>
                  </View>
                ))}
              </View>

              {loading && (
                <View style={{ marginVertical: 8, alignItems: 'center' }}>
                  <ActivityIndicator size="small" color="#1A4F3F" />
                  <Text style={{ color: '#555', marginTop: 6 }}>جارٍ القراءة والمعالجة...</Text>
                </View>
              )}

              {errorMsg && (
                <Text style={{ color: '#C62828', fontWeight: '700', marginBottom: 8, textAlign: 'center' }}>
                  {errorMsg}
                </Text>
              )}

              {!extracted ? (
                <TouchableOpacity style={styles.modalBtn} onPress={handleUpload} disabled={loading}>
                  <Text style={styles.modalBtnText}>{loading ? 'جارٍ الرفع...' : 'اختر ملف من الكمبيوتر'}</Text>
                </TouchableOpacity>
              ) : (
                <View style={{ width: '100%' }}>
                  <View style={[styles.card, { backgroundColor: '#fafafa' }]}>
                    <Text style={styles.docTitle}>📄 {extracted.type_label}</Text>
                    {extracted.number && <Text style={styles.docInfo}>رقم: {extracted.number}</Text>}
                    {extracted.issue_date && <Text style={styles.docInfo}>الإصدار: {extracted.issue_date}</Text>}
                    {extracted.expiry_date && <Text style={styles.docInfo}>الانتهاء: {extracted.expiry_date}</Text>}
                    {extracted.place_of_birth && <Text style={styles.docInfo}>مكان الميلاد: {extracted.place_of_birth}</Text>}
                  </View>

                  {!submitted ? (
                    <TouchableOpacity
                      style={[styles.modalBtn, { backgroundColor: '#2E7D32' }]}
                      onPress={handleSubmit}
                    >
                      <Text style={styles.modalBtnText}>إرسال الطلب</Text>
                    </TouchableOpacity>
                  ) : (
                    <Text style={{ color: 'green', fontWeight: '700', marginTop: 10, textAlign: 'center' }}>
                      ✅ تم إرسال طلبكم
                    </Text>
                  )}
                </View>
              )}

              <TouchableOpacity style={[styles.modalBtn, { marginTop: 12 }]} onPress={() => setUploadModal(false)}>
                <Text style={styles.modalBtnText}>إغلاق</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  statsBar: { flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 16, gap: 8 },
  statBox: { flex: 1, backgroundColor: '#F0F4F3', paddingVertical: 12, borderRadius: 12, alignItems: 'center', justifyContent: 'center', elevation: 2 },
  statLabel: { fontSize: 12, color: '#555', fontWeight: '600', marginBottom: 4 },
  statValue: { fontSize: 16, fontWeight: '700', color: '#000' },
  filterRow: { flexDirection: 'row-reverse', marginBottom: 12 },
  filterBtn: { paddingVertical: 6, paddingHorizontal: 12, backgroundColor: '#eee', borderRadius: 6, marginHorizontal: 4 },
  filterText: { fontSize: 13, fontWeight: '700', color: '#444' },
  filterTextActive: { color: '#fff' },
  scrollContent: { paddingBottom: 100 },
  card: { borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#eee', backgroundColor: '#fafafa' },
  cardHeader: { flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 6 },
  docTitle: { fontSize: 15, fontWeight: '700', textAlign: 'right', color: '#123C34' },
  docInfo: { fontSize: 13, marginBottom: 4, textAlign: 'right', color: '#555' },
  addBtn: { flexDirection: 'row-reverse', alignItems: 'center', backgroundColor: '#1A4F3F', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 20, position: 'absolute', bottom: 20, right: 20, elevation: 3 },
  addText: { color: '#fff', fontSize: 14, fontWeight: '700', marginRight: 8 },

  // مودال
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: { fontSize: 16, fontWeight: '700', marginBottom: 10, color: '#123C34' },
  modalBtn: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#1A4F3F',
  },
  modalBtnText: { color: '#fff', fontSize: 14, fontWeight: '700' },


  // الخط الزمني
  timeline: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginVertical: 16,
    width: '100%',
  },
  timelineStep: { alignItems: 'center', flex: 1 },
  timelineCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  timelineNumber: { color: '#fff', fontSize: 12, fontWeight: '700' },
  timelineLabel: { fontSize: 11, textAlign: 'center', color: '#333' },
});
