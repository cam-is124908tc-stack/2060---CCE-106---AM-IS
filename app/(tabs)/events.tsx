import EventCard from '@/components/EventCard';
import { INITIAL_EVENTS } from '@/constants/eventsData';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function EventsScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const events = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return INITIAL_EVENTS;

    return INITIAL_EVENTS.filter((event) =>
      [event.title, event.category, event.venue].some((value) =>
        value.toLowerCase().includes(normalizedQuery),
      ),
    );
  }, [query]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Campus Events</Text>
        <Text style={styles.subtitle}>Find activities happening around campus.</Text>

        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search events, categories, or venues"
          placeholderTextColor="#64748B"
          style={styles.searchInput}
          accessibilityLabel="Search events"
          returnKeyType="search"
        />

        <Text style={styles.resultCount}>
          {events.length} {events.length === 1 ? 'event' : 'events'} found
        </Text>

        {events.length ? (
          events.map((event) => (
            <EventCard
              key={event.id}
              {...event}
              onPress={() => router.push({ pathname: '/event/[id]', params: { id: event.id } })}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No events found</Text>
            <Text style={styles.emptyText}>Try a different search term.</Text>
            <Pressable style={styles.clearButton} onPress={() => setQuery('')}>
              <Text style={styles.clearButtonText}>Clear search</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  content: { padding: 24, paddingTop: 40, paddingBottom: 32 },
  title: { color: '#F8FAFC', fontSize: 28, fontWeight: '900' },
  subtitle: { color: '#94A3B8', fontSize: 14, marginTop: 4, marginBottom: 20 },
  searchInput: {
    backgroundColor: '#1E293B', borderWidth: 1, borderColor: '#334155', borderRadius: 12,
    color: '#F8FAFC', fontSize: 14, paddingHorizontal: 14, paddingVertical: 13,
  },
  resultCount: { color: '#94A3B8', fontSize: 12, fontWeight: '700', marginVertical: 16 },
  emptyState: { alignItems: 'center', paddingVertical: 36 },
  emptyTitle: { color: '#F8FAFC', fontSize: 16, fontWeight: '800' },
  emptyText: { color: '#94A3B8', fontSize: 13, marginTop: 6 },
  clearButton: { backgroundColor: '#6366F1', borderRadius: 10, marginTop: 16, paddingHorizontal: 14, paddingVertical: 10 },
  clearButtonText: { color: '#FFFFFF', fontSize: 13, fontWeight: '800' },
});
