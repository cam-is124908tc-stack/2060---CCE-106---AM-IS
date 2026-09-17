import StatCard from '@/components/StatCard';
import { INITIAL_EVENTS } from '@/constants/eventsData';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  const totalEvents = INITIAL_EVENTS.length;
  const joinedEvents = INITIAL_EVENTS.filter((e) => e.isJoined).length;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.welcome}>Welcome back,</Text>
        <Text style={styles.name}>Student 👋</Text>

        <Text style={styles.sectionTitle}>Dashboard Metrics</Text>
        <View style={styles.statsGrid}>
          <StatCard label="Total Events" value={totalEvents} />
          <StatCard label="Joined Events" value={joinedEvents} />
          <StatCard label="Upcoming" value={3} />
        </View>

        <Link href="/(tabs)/events" asChild>
          <Pressable style={styles.primaryBtn}>
            <Text style={styles.btnText}>Browse All Events (Link)</Text>
          </Pressable>
        </Link>

        <Pressable style={styles.secondaryBtn} onPress={() => router.push('/(tabs)/profile')}>
          <Text style={styles.secondaryBtnText}>View Profile (Router Push)</Text>
        </Pressable>

        <Pressable style={styles.secondaryBtn} onPress={() => router.push('/(tabs)/lab08')}>
          <Text style={styles.secondaryBtnText}>Open Attendance List</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  content: { padding: 24, paddingTop: 40 },
  welcome: { color: '#94A3B8', fontSize: 16 },
  name: { color: '#F8FAFC', fontSize: 28, fontWeight: '900', marginBottom: 24 },
  sectionTitle: { color: '#F8FAFC', fontSize: 18, fontWeight: '800', marginBottom: 12 },
  statsGrid: { marginBottom: 10 },
  primaryBtn: {
    backgroundColor: '#6366F1',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  btnText: { color: '#FFFFFF', fontWeight: '800', fontSize: 14 },
  secondaryBtn: {
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  secondaryBtnText: { color: '#F8FAFC', fontWeight: '700', fontSize: 14 },
});
