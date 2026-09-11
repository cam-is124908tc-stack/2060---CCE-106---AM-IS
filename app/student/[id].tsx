import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';


export default function StudentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'Student record' }} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerBlock}>
          <Text style={styles.eyebrow}>STUDENT ID RECORD</Text>
          <Text style={styles.titleText}>{id}</Text>
        </View>

        <View style={styles.glassForm}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Academic Status</Text>
            <Text style={styles.rowValue}>Regular Student</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Current Semester</Text>
            <Text style={styles.rowValue}>1st Semester, AY 2026-2027</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Units Enrolled</Text>
            <Text style={styles.rowValue}>18 Units</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
  },
  headerBlock: {
    marginBottom: 24,
  },
  eyebrow: {
    color: '#818CF8',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  titleText: {
    color: '#F8FAFC',
    fontSize: 26,
    fontWeight: '900',
    marginTop: 2,
  },
  glassForm: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  row: {
    paddingVertical: 14,
  },
  divider: {
    height: 1,
    backgroundColor: '#334155',
  },
  rowLabel: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  rowValue: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 4,
  },
});