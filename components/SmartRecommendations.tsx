import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../data/constants';

type Props = {
  items: string[];
};

export default function SmartRecommendations({ items }: Props) {
  if (!items.length) return null;

  return (
    <View style={styles.box}>
      <Text style={styles.title}>توصيات ذكية</Text>
      {items.map((txt, i) => (
        <View key={i} style={styles.row}>
          <FontAwesome name="lightbulb-o" size={16} color={COLORS.orange} style={{ marginLeft: 8 }} />
          <Text style={styles.text}>{txt}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  box: { backgroundColor: COLORS.card, borderRadius: 10, padding: 12, marginBottom: 16 },
  title: { fontSize: 16, fontWeight: '700', color: COLORS.brandDark, marginBottom: 10 },
  row: { flexDirection: 'row-reverse', alignItems: 'center', paddingVertical: 6 },
  text: { fontSize: 13, color: COLORS.text },
});
