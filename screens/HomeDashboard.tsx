import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, messages, platformLabels, statusColors } from '../data/constants';
import { documents, users } from '../data/mockDB';
import { isExpired, isNearExpiry, isNew } from '../utils/documentHelpers';

const currentUser = users.find((u) => u.user_id === 'u-ibtesam') || users[0];
const userDocs = documents.filter((d) => d.user_id === currentUser.user_id);

const ministries = [
  'وزارة الداخلية',
  'وزارة التعليم',
  'وزارة الصحة',
  'وزارة التجارة',
  'وزارة الموارد البشرية',
  'وزارة الشؤون البلدية والقروية والإسكان',
];

const authorities = [
  'هيئة المهندسين',
  'هيئة الاتصالات وتقنية المعلومات',
  'هيئة الزكاة والضريبة والجمارك',
  'البريد السعودي',
];

const allIssuers = [...ministries, ...authorities];

const groupedByIssuer = userDocs.reduce((acc, doc) => {
  const issuer = doc.issuer;
  if (!acc[issuer]) acc[issuer] = [];
  acc[issuer].push(doc);
  return acc;
}, {} as Record<string, typeof userDocs>);

const sortedIssuers = [
  ...allIssuers.filter((i) => groupedByIssuer[i]),
  ...allIssuers.filter((i) => !groupedByIssuer[i]),
];

const getStatus = (doc: any) => {
  if (isExpired(doc.expiry_date)) return 'منتهية';
  if (isNearExpiry(doc.expiry_date)) return 'قرب انتهاء';
  if (isNew(doc.uploaded_at)) return 'جديدة';
  return 'سارية';
};

export default function WathiqatyDashboard() {
  const [selectedIssuer, setSelectedIssuer] = useState<string>(sortedIssuers[0]);
  const docs = groupedByIssuer[selectedIssuer] || [];

  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <MaterialIcons name="account-circle" size={28} color={COLORS.brandDark} />
        <Text style={styles.welcome}>مرحبًا {currentUser.name}</Text>
      </View>
      <Text style={styles.sub}>
        اختر الوزارة أو الجهة لعرض وثائقك الرسمية المرتبطة بها.
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.tabRow, { justifyContent: 'flex-end' }]}
      >
        {sortedIssuers.map((issuer) => {
          const isActive = selectedIssuer === issuer;
          const count = groupedByIssuer[issuer]?.length || 0;
          return (
            <TouchableOpacity
              key={issuer}
              style={[styles.tabBtn, isActive && styles.tabBtnActive]}
              onPress={() => setSelectedIssuer(issuer)}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {issuer} ({count})
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {docs.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>{messages.noDocs}</Text>
        </View>
      ) : (
        <FlatList
          data={docs}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'flex-end' }}
          keyExtractor={(item) => item.doc_id}
          contentContainerStyle={{ paddingTop: 8, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: doc }) => {
            const status = getStatus(doc);
            return (
              <View style={styles.docCard}>
                <Text style={styles.docType}>{doc.type_label}</Text>
                <Text style={styles.docIssuer}>
                  {platformLabels[doc.source_platform] || doc.source_platform}
                </Text>

                <View style={styles.infoRow}>
                  <View
                    style={[
                      styles.statusBox,
                      { backgroundColor: statusColors[status] },
                    ]}
                  >
                    <Text style={styles.statusTextCard}>{status}</Text>
                  </View>
                  <View style={styles.infoBox}>
                    <Text style={styles.infoText}>
                      {doc.issue_date?.split('-')[0] || '—'}
                    </Text>
                  </View>
                  <View style={styles.infoBox}>
                    <Text style={styles.infoText}>
                      {doc.reference || '—'}
                    </Text>
                  </View>
                </View>

                <View style={styles.btnRow}>
                  <TouchableOpacity style={styles.viewBtn}>
                    <Text style={styles.viewBtnText}>عرض الوثيقة</Text>
                  </TouchableOpacity>
                  {doc.reference && (
                    <TouchableOpacity style={styles.downloadBtn}>
                      <Text style={styles.downloadText}>تحميل</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F9F9F9' },
  headerBox: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: 6,
  },
  welcome: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.brandDark,
    marginRight: 8,
  },
  sub: {
    fontSize: 14,
    color: COLORS.text,
    textAlign: 'right',
    marginBottom: 16,
  },
  tabRow: {
    flexDirection: 'row-reverse',
    gap: 12,
    marginTop: 12,
    marginBottom: 8,
    justifyContent: 'flex-end',
  },
  tabBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: '#eee',
    borderRadius: 20,
    elevation: 1,
    minWidth: 140,
    maxHeight: 50,
  },
  tabBtnActive: {
    backgroundColor: COLORS.brandDark,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
  },
  tabTextActive: {
    color: '#fff',
    fontWeight: '800',
  },
  emptyBox: { marginTop: 20, alignItems: 'center' },
  emptyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
  },
  docCard: {
  backgroundColor: '#fff',
  borderRadius: 14,
  padding: 16,
  marginBottom: 16,
  width: '48%',
  elevation: 5,
  shadowColor: '#000',
  shadowOpacity: 0.08,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: 2 },
  borderWidth: 1,
  borderColor: '#eee',
  alignItems: 'flex-end', 
},

  docType: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.brandDark,
    textAlign: 'right',
    marginBottom: 4,
  },
  docIssuer: {
    fontSize: 13,
    color: COLORS.text,
    textAlign: 'right',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statusBox: {
    flex: 1,
    marginHorizontal: 2,
    borderRadius: 8,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusTextCard: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
infoBox: {
  flex: 1.2, 
  marginHorizontal: 2,
  borderRadius: 8,
  paddingVertical: 3, 
  paddingHorizontal: 40, 
  backgroundColor: 'rgba(250,250,250,0.7)',
  borderWidth: 1,
  borderColor: '#ddd',
  alignItems: 'center',
  justifyContent: 'center',
},
  infoText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
  },
  btnRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    gap: 8,
  },
  viewBtn: {
    backgroundColor: COLORS.brandDark,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  viewBtnText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  downloadBtn: {
    backgroundColor: COLORS.brandMid,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  downloadText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
});
