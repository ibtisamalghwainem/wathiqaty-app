import { FontAwesome } from '@expo/vector-icons';
import { Image, StyleSheet, Text, View } from 'react-native';
import { COLORS, DocumentCategory, GovDocument, STATUS_STYLES } from '../data/constants';

function DocumentCard({ doc }: { doc: GovDocument }) {
  const statusStyle = STATUS_STYLES[doc.status] || STATUS_STYLES['سارية'];
  const logo = doc.logo || require('../assets/images/default-logo.png');

  return (
    <View style={styles.docCard}>
      <View style={styles.docHeader}>
        <Image source={logo} style={styles.logo} />
        <View style={{ flex: 1 }}>
          <Text style={styles.sourceText}>{doc.source_platform}</Text>
          <Text style={styles.typeText}>{doc.type_label}</Text>
        </View>
        <View style={styles.statusPill}>
          <FontAwesome name={statusStyle.icon as any} size={14} color={statusStyle.color} />
          <Text style={[styles.statusText, { color: statusStyle.color }]}>{doc.status}</Text>
        </View>
      </View>

      <View style={styles.docMeta}>
        {doc.issue_date && <Text style={styles.metaText}>تاريخ الإصدار: {doc.issue_date}</Text>}
        {doc.expiry_date && <Text style={styles.metaText}>تاريخ الانتهاء: {doc.expiry_date}</Text>}
        {doc.uploaded_at && (
          <Text style={styles.metaText}>
            تم الرفع: {new Date(doc.uploaded_at).toLocaleDateString('ar-SA')}
          </Text>
        )}
        {doc.reference && <Text style={styles.metaText}>الرقم المرجعي: {doc.reference}</Text>}
        {doc.issuer && <Text style={styles.metaText}>الجهة: {doc.issuer}</Text>}
      </View>
    </View>
  );
}

export default function CategorySection({
  title,
  icon,
  docs,
}: {
  title: DocumentCategory;
  icon: string;
  docs: GovDocument[];
}) {
  return (
    <View style={styles.sectionBox}>
      <View style={styles.sectionTitleRow}>
        <FontAwesome
          name={icon as any}
          size={16}
          color={COLORS.brandDark}
          style={{ marginLeft: 8 }}
        />
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={{ flex: 1 }} />
        <Text style={styles.countBadge}>{docs.length} وثيقة</Text>
      </View>

      {docs.length === 0 ? (
        <Text style={styles.emptyText}>لا توجد وثائق في هذا التصنيف حتى الآن.</Text>
      ) : (
        docs.map((d) => <DocumentCard key={d.doc_id} doc={d} />)
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionBox: {
    backgroundColor: COLORS.card,
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  sectionTitleRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: COLORS.brandDark },
  countBadge: { fontSize: 12, color: COLORS.textDim },
  emptyText: { fontSize: 12, color: COLORS.textDim },

  docCard: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  docHeader: { flexDirection: 'row-reverse', alignItems: 'center', marginBottom: 8 },
  logo: {
    width: 28,
    height: 28,
    marginLeft: 8,
    borderRadius: 6,
    backgroundColor: '#F2F5F2',
  },
  sourceText: { fontSize: 12, color: COLORS.textDim },
  typeText: { fontSize: 14, fontWeight: '600', color: COLORS.brandDark },
  statusPill: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 6,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#F8FAF8',
  },
  statusText: { fontSize: 12, fontWeight: '700' },
  docMeta: { flexDirection: 'row-reverse', flexWrap: 'wrap', gap: 10 },
  metaText: { fontSize: 12, color: COLORS.text },
});
