import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { borderRadius, colors, spacing } from './theme';

const SCHEDULE_DATA = [
  {
    code: '2063',
    title: 'CCE 106',
    description: 'APPLICATION DEVELOPMENT AND EMERGING TECHNOLOGIES',
    units: '3.0',
    day: 'M-Sa',
    term: '1st Term',
    time: '10:00 AM - 12:00 PM',
  },
  {
    code: '2015',
    title: 'IT 11',
    description: 'NETWORKING 2',
    units: '3.0',
    day: 'M-Sa',
    term: '1st Term',
    time: '01:30 PM - 03:30 PM',
  },
  {
    code: '2034',
    title: 'IT 12',
    description: 'SYSTEMS INTEGRATION & ARCHITECTURE',
    units: '3.0',
    day: 'M-Sa',
    term: '1st Term',
    time: '03:30 PM - 05:30 PM',
  },
];

export default function ScheduleScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>1st Term Schedule</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionSubtitle}>Enrolled Courses</Text>

        {SCHEDULE_DATA.map((item, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.codeBadge}>
                <Text style={styles.codeText}>{item.code}</Text>
              </View>
              <Text style={styles.subjectTitle}>{item.title}</Text>
              <View style={styles.unitsBadge}>
                <Text style={styles.unitsText}>{item.units} Units</Text>
              </View>
            </View>

            <Text style={styles.description}>{item.description}</Text>

            <View style={styles.divider} />

            <View style={styles.cardFooter}>
              <View style={styles.infoRow}>
                <Ionicons name="time-outline" size={16} color={colors.primary} />
                <Text style={styles.infoText}>{item.time}</Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="calendar-outline" size={16} color={colors.primary} />
                <Text style={styles.infoText}>{item.day}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.card,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  sectionSubtitle: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.md,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  codeBadge: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  codeText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  subjectTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
    flex: 1,
  },
  unitsBadge: {
    backgroundColor: colors.successBg,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  unitsText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '800',
  },
  description: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 18,
    marginBottom: spacing.sm,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.xs,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  infoText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
});