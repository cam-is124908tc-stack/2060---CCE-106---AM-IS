import { INITIAL_EVENTS } from '@/constants/eventsData';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const event = INITIAL_EVENTS.find((item) => item.id === id);
  const [isJoined, setIsJoined] = useState(event?.isJoined || false);

  if (!event) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Event Not Found</Text>
        <Text style={styles.errorSubtitle}>Invalid Event ID: {id}</Text>
        <Pressable style={styles.joinBtn} onPress={() => router.back()}>
          <Text style={styles.btnText}>Go Back</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Pressable onPress={() => router.back()} style={styles.backLink}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>

        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.info}>Category: {event.category}</Text>
        <Text style={styles.info}>Date: {event.dateTime}</Text>
        <Text style={styles.info}>Venue: {event.venue}</Text>
        <Text style={styles.desc}>{event.description}</Text>

        <Pressable
          style={[styles.actionBtn, isJoined ? styles.leaveBtn : styles.joinBtn]}
          onPress={() => setIsJoined(!isJoined)}
        >
          <Text style={styles.btnText}>{isJoined ? 'Leave Event' : 'Join Event'}</Text>
        </Pressable>

        <Text style={styles.status}>
          Status: {isJoined ? 'Joined ✓' : 'Not Joined'}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  content: { padding: 24, paddingTop: 40 },
  errorContainer: { flex: 1, backgroundColor: '#0F172A', justifyContent: 'center', alignItems: 'center' },
  errorTitle: { color: '#F43F5E', fontSize: 20, fontWeight: '800' },
  errorSubtitle: { color: '#94A3B8', marginTop: 8, marginBottom: 16 },
  backLink: { marginBottom: 16 },
  backText: { color: '#818CF8', fontWeight: '700' },
  title: { color: '#F8FAFC', fontSize: 24, fontWeight: '800', marginBottom: 12 },
  info: { color: '#CBD5E1', fontSize: 14, marginBottom: 4 },
  desc: { color: '#94A3B8', marginTop: 12, marginBottom: 24, lineHeight: 20 },
  actionBtn: { padding: 16, borderRadius: 12, alignItems: 'center' },
  joinBtn: { backgroundColor: '#10B981' },
  leaveBtn: { backgroundColor: '#E11D48' },
  btnText: { color: '#FFFFFF', fontWeight: '800' },
  status: { color: '#94A3B8', textAlign: 'center', marginTop: 12, fontSize: 12 },
});
