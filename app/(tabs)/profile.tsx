import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../theme';

const STUDENT = {
  id: '124908',
  name: 'Cesario G. Am-is Jr.',
  email: 'c.am-is.124908.tc@umindanao.edu.ph',
  program: 'Information Technology',
  year: '3rd Year',
  status: 'Regular Student',
  semester: '1st Semester, AY 2026-2027',
  units: '18 Units',
};

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.greetingText}>STUDENT PROFILE</Text>

        <View style={styles.heroCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>CA</Text>
          </View>
          <View style={styles.profileTextContainer}>
            <Text style={styles.studentName}>{STUDENT.name}</Text>
            <Text style={styles.studentEmail}>{STUDENT.email}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Academic Details & Record</Text>
        <View style={styles.glassForm}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Student ID</Text>
            <Text style={styles.rowValue}>{STUDENT.id}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Program</Text>
            <Text style={styles.rowValue}>{STUDENT.program}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Year Level</Text>
            <Text style={styles.rowValue}>{STUDENT.year}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Academic Status</Text>
            <Text style={styles.rowValue}>{STUDENT.status}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Current Semester</Text>
            <Text style={styles.rowValue}>{STUDENT.semester}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Units Enrolled</Text>
            <Text style={styles.rowValue}>{STUDENT.units}</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.card,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
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
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
  },
  greetingText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  heroCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 18,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: '#E6F7ED',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: '800',
  },
  profileTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  studentName: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  studentEmail: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  glassForm: {
    backgroundColor: colors.card,
    borderRadius: 20,
    paddingHorizontal: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  row: {
    paddingVertical: 14,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  rowLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  rowValue: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
    marginTop: 4,
  },
});