import { Image, StyleSheet, View } from 'react-native';
import { IMAGES } from '../lib/images';
import { theme } from '../lib/theme';
import { ThemedText } from './themed-text';

export function GovBadge({ issuer }: { issuer: string }) {
  return (
    <View style={styles.badge}>
      <Image source={{ uri: IMAGES.logoSaGov }} style={styles.logo} />
      <ThemedText style={styles.text}>{issuer}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#fff8e1',
    borderRadius: theme.radius.sm,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#FFD700', 
  },
  logo: { width: 20, height: 20 },
  text: { fontSize: theme.typography.body, color: theme.colors.text, fontWeight: '600' },
});
