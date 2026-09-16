import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface EventCardProps {
  title: string;
  category: string;
  dateTime: string;
  venue: string;
  onPress: () => void;
}

export default function EventCard({ title, category, dateTime, venue, onPress }: EventCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress} accessibilityRole="button" accessibilityLabel={`View ${title}`}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.category}>{category}</Text>
      <View style={styles.detailsRow}>
        <Ionicons name="calendar-outline" size={14} color="#94A3B8" />
        <Text style={styles.details}>{dateTime}</Text>
      </View>
      <View style={styles.detailsRow}>
        <Ionicons name="location-outline" size={14} color="#94A3B8" />
        <Text style={styles.details}>{venue}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#1E293B', padding: 16, borderRadius: 12, marginBottom: 10, borderWidth: 1, borderColor: '#334155' },
  title: { color: '#F8FAFC', fontSize: 16, fontWeight: '700' },
  category: { color: '#818CF8', fontSize: 12, fontWeight: '600', marginTop: 2 },
  detailsRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
  details: { color: '#94A3B8', fontSize: 12 },
});
