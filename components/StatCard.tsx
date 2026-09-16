import { StyleSheet, Text, View } from 'react-native';

interface StatCardProps {
  label: string;
  value: number;
}

export default function StatCard({ label, value }: StatCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#1E293B', borderColor: '#334155', borderRadius: 14, borderWidth: 1, marginBottom: 10, padding: 16 },
  value: { color: '#F8FAFC', fontSize: 24, fontWeight: '900' },
  label: { color: '#94A3B8', fontSize: 13, fontWeight: '600', marginTop: 4 },
});
