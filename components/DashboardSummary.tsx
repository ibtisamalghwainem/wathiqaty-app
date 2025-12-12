import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../data/constants';

type Props = {
  stats: {
    total: number;
    expired: number;
    near: number;
    fresh: number;
  };
};

export default function DashboardSummary({ stats }: Props) {
  const items = [
    { label: 'إجمالي الوثائق', value: stats.total, icon: 'file-text', color: COLORS.brandDark },
    { label: 'منتهية', value: stats.expired, icon: 'times-circle', color: COLORS.red },
    { label: 'قريبة الانتهاء', value: stats.near, icon: 'exclamation-circle', color: COLORS.orange },
    { label: 'مضافة حديثًا', value: stats.fresh, icon: 'star', color: COLORS.green },
  ];

  return (
    <View style={styles.row}>
      {items.map((item, idx) => (
        <View key={idx} style={styles.card}>
          <FontAwesome name={item.icon as any} size={18} color={item.color} />
          <Text style={styles.value}>{item.value}</Text>
          <Text style={styles.label}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row-reverse', gap: 10, marginBottom: 16, flexWrap: 'wrap' },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 10,
    padding: 12,
    minWidth: 140,
    alignItems: 'flex-end',
    gap: 6,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  value: { fontSize: 18, fontWeight: '700', color: COLORS.brandDark },
  label: { fontSize: 12, color: COLORS.textDim },
});
