import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { borderRadius, colors, spacing } from '../theme';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>C</Text>
            </View>
            <View>
              <Text style={styles.greetingText}>Hi, Cesario</Text>
              <Text style={styles.subGreeting}>Track your academic progress</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationBtn}>
            <Ionicons name="notifications-outline" size={20} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Ginawang clickable papuntang course detail page */}
        <TouchableOpacity 
          style={styles.heroCard} 
          onPress={() => router.push('/course/2063')}
          activeOpacity={0.9}
        >
          <View style={styles.badgeRow}>
            <View style={styles.liveBadge}>
              <Text style={styles.liveText}>● ACTIVE COURSE</Text>
            </View>
          </View>

          <Text style={styles.heroTitle}>Mobile Development</Text>
          <Text style={styles.heroSubtitle}>React Native fundamentals · Room 301</Text>

          <View style={styles.progressRow}>
            <View style={styles.track}>
              <View style={[styles.fill, { width: '82%' }]} />
            </View>
            <Text style={styles.percentText}>82%</Text>
          </View>

          <View style={styles.heroFooter}>
            <Text style={styles.heroFooterText}>Arriving class: Today, 10:00 AM</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/schedule')}>
            <View style={styles.actionIconBox}>
              <Ionicons name="calendar-outline" size={20} color={colors.primary} />
            </View>
            <Text style={styles.actionText}>Schedule</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/profile')}>
            <View style={styles.actionIconBox}>
              <Ionicons name="person-outline" size={20} color={colors.primary} />
            </View>
            <Text style={styles.actionText}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.actionIconBox}>
              <Ionicons name="document-text-outline" size={20} color={colors.primary} />
            </View>
            <Text style={styles.actionText}>Grades</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.metricCard}>
            <Ionicons name="school-outline" size={20} color={colors.primary} />
            <Text style={styles.metricNumber}>3.82</Text>
            <Text style={styles.metricLabel}>Current GPA</Text>
          </View>

          <View style={styles.metricCard}>
            <Ionicons name="trending-up-outline" size={20} color={colors.primary} />
            <Text style={styles.metricNumber}>68%</Text>
            <Text style={styles.metricLabel}>Avg. Progress</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Upcoming Assignment</Text>
        <View style={styles.taskCard}>
          <View style={styles.dateBox}>
            <Text style={styles.dateNum}>12</Text>
            <Text style={styles.dateMonth}>SEP</Text>
          </View>
          <View style={styles.taskContent}>
            <Text style={styles.taskTitle}>Database Systems Quiz</Text>
            <Text style={styles.dateText}>Saturday · 10:00 AM · Room 204</Text>
          </View>
          <View style={styles.dueBadge}>
            <Text style={styles.dueText}>Due soon</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 18,
  },
  greetingText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  subGreeting: {
    color: colors.textMuted,
    fontSize: 12,
  },
  notificationBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  heroCard: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  badgeRow: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },
  liveBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
  },
  liveText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
  },
  heroSubtitle: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 13,
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  track: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
  },
  percentText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  heroFooter: {
    marginTop: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  heroFooterText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
    marginBottom: spacing.sm,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  actionCard: {
    flex: 0.31,
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionIconBox: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    backgroundColor: colors.successBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  actionText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '700',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  metricCard: {
    flex: 0.48,
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  metricNumber: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
    marginTop: spacing.xs,
  },
  metricLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  taskCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  dateBox: {
    width: 42,
    height: 42,
    borderRadius: borderRadius.md,
    backgroundColor: colors.successBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  dateNum: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '800',
  },
  dateMonth: {
    color: colors.primary,
    fontSize: 9,
    fontWeight: '800',
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  dateText: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 2,
  },
  dueBadge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  dueText: {
    color: '#EF4444',
    fontSize: 10,
    fontWeight: '700',
  },
});