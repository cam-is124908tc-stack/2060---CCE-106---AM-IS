import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../theme';

const COURSE_DATA: Record<
  string,
  { title: string; instructor: string; schedule: string; room: string; units: string }
> = {
  CCE106: {
    title: 'Mobile Application Development',
    instructor: 'Prof. J. Santos',
    schedule: 'Mon / Wed · 1:00 PM - 2:30 PM',
    room: 'CL-204',
    units: '3',
  },
  CS301: {
    title: 'Database Management Systems',
    instructor: 'Prof. M. Reyes',
    schedule: 'Tue / Thu · 9:00 AM - 10:30 AM',
    room: 'CL-108',
    units: '3',
  },
};

export default function CourseDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const course = COURSE_DATA[id ?? ''];

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{id ?? 'Course'}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerBlock}>
          <Text style={styles.codeText}>{id}</Text>
          <Text style={styles.titleText}>{course?.title ?? 'Course details'}</Text>
        </View>

        {course && (
          <View style={styles.glassForm}>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Instructor</Text>
              <Text style={styles.rowValue}>{course.instructor}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Schedule</Text>
              <Text style={styles.rowValue}>{course.schedule}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Room</Text>
              <Text style={styles.rowValue}>{course.room}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Units</Text>
              <Text style={styles.rowValue}>{course.units}</Text>
            </View>
          </View>
        )}
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
    paddingTop: 20,
    paddingBottom: 40,
  },
  headerBlock: {
    marginBottom: 24,
  },
  codeText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
  },
  titleText: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '900',
    marginTop: 4,
  },
  glassForm: {
    backgroundColor: colors.card,
    borderRadius: 20,
    paddingHorizontal: 16,
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