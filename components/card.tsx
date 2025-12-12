import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { theme } from '../lib/theme';
import { ThemedText } from './themed-text';

export function DocumentCard({ title, refNo, issuer, onPress }: { title: string; refNo: string; issuer: string; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.header}>
        <Ionicons name="document-text-outline" size={22} color={theme.colors.primary} />
        <ThemedText style={styles.title}>{title}</ThemedText>
      </View>
      <ThemedText style={styles.ref}>رقم: {refNo}</ThemedText>
      <ThemedText style={styles.issuer}>الجهة: {issuer}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.md,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  header: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  title: { fontSize: theme.typography.h2, fontWeight: '700' },
  ref: { fontSize: theme.typography.body, color: theme.colors.muted },
  issuer: { fontSize: theme.typography.body, color: theme.colors.text },
});
