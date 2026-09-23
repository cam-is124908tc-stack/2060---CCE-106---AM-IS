import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { clearSavedToken, fetchStudentGrades, getSavedToken, isAuthApiConfigured, isDemoMode, StudentGrade } from '../lib/student-auth';

const C = { background: '#F4F7FB', ink: '#17253D', muted: '#71819A', navy: '#102E60', blue: '#174581', cyan: '#21B8D2', border: '#DCE4EF', danger: '#C83E4D' };

export default function GradesScreen() {
  const router = useRouter();
  const [grades, setGrades] = useState<StudentGrade[]>([]);
  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    const loadGrades = async () => {
      try {
        const token = await getSavedToken();
        if (!token) {
          if (active) setSignedIn(false);
          return;
        }
        if (active) setSignedIn(true);
        const result = await fetchStudentGrades(token);
        if (active) setGrades(result);
      } catch (loadError) {
        const message = loadError instanceof Error ? loadError.message : 'Could not load grades.';
        if (message.includes('(401)') || message.toLowerCase().includes('unauthorized')) {
          await clearSavedToken();
          if (active) setSignedIn(false);
        } else if (active) {
          setError(message);
        }
      } finally {
        if (active) setLoading(false);
      }
    };
    void loadGrades();
    return () => { active = false; };
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ title: 'Grades' }} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.heading}>
          <View style={styles.headingIcon}><Ionicons name="school-outline" size={22} color={C.cyan} /></View>
          <Text style={styles.eyebrow}>ACADEMIC RECORD</Text>
          <Text style={styles.title}>My Grades</Text>
          <Text style={styles.subtitle}>{isDemoMode ? 'Sample results from the demo student account.' : 'Your results, securely retrieved from the student portal.'}</Text>
        </View>

        {loading ? (
          <View style={styles.stateCard}><ActivityIndicator size="large" color={C.cyan} /><Text style={styles.stateText}>Loading your grades…</Text></View>
        ) : !isAuthApiConfigured ? (
          <MessageCard icon="settings-outline" title="Backend setup needed" message="Add EXPO_PUBLIC_API_URL and the grades endpoint to your .env configuration." />
        ) : !signedIn ? (
          <View style={styles.stateCard}>
            <View style={styles.emptyIcon}><Ionicons name="lock-closed-outline" size={24} color={C.blue} /></View>
            <Text style={styles.stateTitle}>Sign in to view your grades</Text>
            <Text style={styles.stateText}>Your academic record is available after you sign in.</Text>
            <TouchableOpacity style={styles.button} onPress={() => router.push('/portal')} activeOpacity={0.82}>
              <Text style={styles.buttonText}>GO TO STUDENT PORTAL</Text><Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        ) : error ? (
          <MessageCard icon="alert-circle-outline" title="Couldn’t load grades" message={error} />
        ) : grades.length === 0 ? (
          <MessageCard icon="document-text-outline" title="No grades yet" message="The grades service is connected, but it has not returned any grade records." />
        ) : (
          <View style={styles.gradeList}>
            {grades.map((item, index) => (
              <View key={item.id ?? `${item.courseCode ?? item.course ?? 'grade'}-${index}`} style={styles.gradeCard}>
                <View style={styles.gradeIcon}><Ionicons name="book-outline" size={19} color={C.blue} /></View>
                <View style={styles.gradeDetails}>
                  <Text style={styles.courseCode}>{item.courseCode ?? item.course_code ?? item.course ?? item.subject ?? 'Course'}</Text>
                  {!!item.course && item.courseCode && <Text style={styles.courseName}>{item.course}</Text>}
                  <Text style={styles.term}>{item.term ?? item.semester ?? 'Academic record'}{item.units ? ` · ${item.units} units` : ''}</Text>
                </View>
                <View style={styles.gradeValueWrap}>
                  <Text style={styles.gradeValue}>{item.grade ?? item.finalGrade ?? item.final_grade ?? '—'}</Text>
                  {!!item.status && <Text style={styles.gradeStatus}>{item.status}</Text>}
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function MessageCard({ icon, title, message }: { icon: React.ComponentProps<typeof Ionicons>['name']; title: string; message: string }) {
  return (
    <View style={styles.stateCard}>
      <View style={styles.emptyIcon}><Ionicons name={icon} size={24} color={C.blue} /></View>
      <Text style={styles.stateTitle}>{title}</Text>
      <Text style={styles.stateText}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: C.background },
  content: { flexGrow: 1, width: '100%', maxWidth: 680, alignSelf: 'center', padding: 24, paddingTop: 30 },
  heading: { marginBottom: 24 },
  headingIcon: { width: 48, height: 48, borderRadius: 16, backgroundColor: '#DDF5F8', alignItems: 'center', justifyContent: 'center', marginBottom: 17 },
  eyebrow: { color: '#47889E', fontSize: 10, fontWeight: '800', letterSpacing: 1.7 },
  title: { color: C.ink, fontSize: 29, fontWeight: '800', marginTop: 6 },
  subtitle: { color: C.muted, fontSize: 13, marginTop: 6, lineHeight: 20 },
  stateCard: { alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 22, borderWidth: 1, borderColor: C.border, padding: 26, marginTop: 7 },
  emptyIcon: { width: 52, height: 52, borderRadius: 17, backgroundColor: '#EAF2FB', alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  stateTitle: { color: C.ink, fontSize: 17, fontWeight: '800', textAlign: 'center' },
  stateText: { color: C.muted, fontSize: 13, textAlign: 'center', lineHeight: 20, marginTop: 8 },
  button: { backgroundColor: '#079FC1', minHeight: 50, borderRadius: 14, marginTop: 21, paddingHorizontal: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9 },
  buttonText: { color: '#FFFFFF', fontSize: 11, fontWeight: '800', letterSpacing: 0.8 },
  gradeList: { gap: 12 },
  gradeCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 18, padding: 16, borderWidth: 1, borderColor: C.border },
  gradeIcon: { width: 42, height: 42, borderRadius: 13, backgroundColor: '#EAF2FB', alignItems: 'center', justifyContent: 'center', marginRight: 13 },
  gradeDetails: { flex: 1 },
  courseCode: { color: C.ink, fontSize: 14, fontWeight: '800' },
  courseName: { color: C.muted, fontSize: 12, marginTop: 3 },
  term: { color: C.muted, fontSize: 11, marginTop: 5 },
  gradeValueWrap: { alignItems: 'flex-end', marginLeft: 10 },
  gradeValue: { color: C.navy, fontSize: 22, fontWeight: '900' },
  gradeStatus: { color: '#11825D', fontSize: 10, fontWeight: '700', marginTop: 3 },
});
