import { useEffect, useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type AttendanceStatus = 'Present' | 'Absent' | null;

type Student = {
  id: number;
  name: string;
};

const STUDENTS: Student[] = [
  { id: 1, name: 'Juan Dela Cruz' },
  { id: 2, name: 'Maria Santos' },
  { id: 3, name: 'Carlo Reyes' },
  { id: 4, name: 'Angela Garcia' },
  { id: 5, name: 'Mark Aquino' },
];

export default function Lab08Screen() {
  const [attendance, setAttendance] = useState<Record<number, AttendanceStatus>>({});
  const [lastUpdated, setLastUpdated] = useState('No attendance recorded yet');

  const totals = useMemo(() => {
    const statuses = Object.values(attendance);
    return {
      present: statuses.filter((status) => status === 'Present').length,
      absent: statuses.filter((status) => status === 'Absent').length,
    };
  }, [attendance]);

  useEffect(() => {
    const recorded = totals.present + totals.absent;
    if (recorded > 0) {
      setLastUpdated(`Updated: ${new Date().toLocaleTimeString()}`);
    }
  }, [totals.present, totals.absent]);

  function markAttendance(studentId: number, status: Exclude<AttendanceStatus, null>) {
    setAttendance((current) => ({ ...current, [studentId]: status }));
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.eyebrow}>LAB 08</Text>
        <Text style={styles.title}>Attendance List</Text>
        <Text style={styles.subtitle}>Mark each student as present or absent.</Text>

        <View style={styles.summaryRow}>
          <View style={[styles.summaryCard, styles.presentSummary]}>
            <Text style={styles.summaryNumber}>{totals.present}</Text>
            <Text style={styles.summaryLabel}>Present</Text>
          </View>
          <View style={[styles.summaryCard, styles.absentSummary]}>
            <Text style={styles.summaryNumber}>{totals.absent}</Text>
            <Text style={styles.summaryLabel}>Absent</Text>
          </View>
        </View>

        <Text style={styles.updatedText}>{lastUpdated}</Text>

        {STUDENTS.map((student) => {
          const status = attendance[student.id];
          return (
            <View key={student.id} style={styles.studentCard}>
              <View style={styles.studentInfo}>
                <Text style={styles.studentName}>{student.name}</Text>
                <Text style={[styles.status, status === 'Present' && styles.presentText, status === 'Absent' && styles.absentText]}>
                  {status ?? 'Not marked'}
                </Text>
              </View>
              <View style={styles.actions}>
                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityLabel={`Mark ${student.name} present`}
                  onPress={() => markAttendance(student.id, 'Present')}
                  style={[styles.button, styles.presentButton, status === 'Present' && styles.selectedButton]}>
                  <Text style={styles.buttonText}>Present</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityLabel={`Mark ${student.name} absent`}
                  onPress={() => markAttendance(student.id, 'Absent')}
                  style={[styles.button, styles.absentButton, status === 'Absent' && styles.selectedButton]}>
                  <Text style={styles.buttonText}>Absent</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  content: { padding: 20, paddingBottom: 36 },
  eyebrow: { color: '#818CF8', fontSize: 12, fontWeight: '800', letterSpacing: 1.2 },
  title: { color: '#F8FAFC', fontSize: 30, fontWeight: '800', marginTop: 4 },
  subtitle: { color: '#94A3B8', fontSize: 15, marginTop: 6, marginBottom: 20 },
  summaryRow: { flexDirection: 'row', gap: 12 },
  summaryCard: { flex: 1, borderRadius: 14, padding: 16 },
  presentSummary: { backgroundColor: '#14532D' },
  absentSummary: { backgroundColor: '#7F1D1D' },
  summaryNumber: { color: '#F8FAFC', fontSize: 26, fontWeight: '800' },
  summaryLabel: { color: '#CBD5E1', fontSize: 13, fontWeight: '700', marginTop: 2 },
  updatedText: { color: '#94A3B8', fontSize: 12, marginVertical: 18 },
  studentCard: { backgroundColor: '#1E293B', borderColor: '#334155', borderRadius: 14, borderWidth: 1, marginBottom: 12, padding: 14 },
  studentInfo: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  studentName: { color: '#F8FAFC', fontSize: 16, fontWeight: '700' },
  status: { color: '#94A3B8', fontSize: 13, fontWeight: '700' },
  presentText: { color: '#86EFAC' },
  absentText: { color: '#FCA5A5' },
  actions: { flexDirection: 'row', gap: 10 },
  button: { alignItems: 'center', borderRadius: 9, flex: 1, paddingVertical: 10 },
  presentButton: { backgroundColor: '#16A34A' },
  absentButton: { backgroundColor: '#DC2626' },
  selectedButton: { borderColor: '#F8FAFC', borderWidth: 2, paddingVertical: 8 },
  buttonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
});
