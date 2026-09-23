import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  clearSavedToken,
  DEMO_CREDENTIALS,
  fetchStudentProfile,
  getSavedToken,
  isDemoMode,
  isUnauthorizedError,
  login,
  StudentProfile,
} from '../../lib/student-auth';

const C = { background: '#F4F7FB', ink: '#17253D', muted: '#71819A', navy: '#102E60', blue: '#174581', cyan: '#21B8D2', border: '#DCE4EF', danger: '#C83E4D' };

export default function StudentPortalScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [restoring, setRestoring] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [restoreError, setRestoreError] = useState('');
  const normalizedRole = profile?.role?.trim().toLowerCase();
  const canViewGrades = !normalizedRole || ['student', 'learner'].includes(normalizedRole);

  const restoreSession = useCallback(async () => {
    setRestoring(true);
    setRestoreError('');
    try {
      const savedToken = await getSavedToken();
      if (!savedToken) return;
      setToken(savedToken);
      const student = await fetchStudentProfile(savedToken);
      setProfile(student);
    } catch (restoreFailure) {
      if (isUnauthorizedError(restoreFailure)) {
        await clearSavedToken();
        setToken(null);
        setProfile(null);
      } else {
        setRestoreError(restoreFailure instanceof Error ? restoreFailure.message : 'Could not restore your session. Check your connection and retry.');
      }
    } finally {
      setRestoring(false);
    }
  }, []);

  useEffect(() => { void restoreSession(); }, [restoreSession]);

  const handleLogin = async () => {
    setError('');
    if (!email.trim() || !password) {
      setError('Enter your school email and password.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Enter a valid email address.');
      return;
    }
    setLoading(true);
    try {
      const result = await login(email.trim(), password);
      setToken(result.token);
      try {
        setProfile(await fetchStudentProfile(result.token));
      } catch (profileError) {
        await clearSavedToken();
        setToken(null);
        throw profileError;
      }
      setPassword('');
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Unable to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    await clearSavedToken();
    setToken(null);
    setProfile(null);
    setPassword('');
    setError('');
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={C.background} />
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={styles.heading}>
            <Text style={styles.eyebrow}>CCE 106 · STUDENT SERVICES</Text>
            <Text style={styles.title}>Student Portal</Text>
            <Text style={styles.subtitle}>{profile ? 'Your account and academic profile' : 'Sign in to view your protected profile'}</Text>
          </View>

          {restoring ? (
            <View style={styles.card}>
              <ActivityIndicator color={C.cyan} size="large" />
              <Text style={styles.loadingText}>Restoring your session…</Text>
            </View>
          ) : restoreError ? (
            <View style={styles.card}>
              <View style={styles.errorBox}>
                <Ionicons name="alert-circle-outline" size={18} color={C.danger} />
                <Text style={styles.errorText}>{restoreError}</Text>
              </View>
              <TouchableOpacity style={styles.loginButton} onPress={() => void restoreSession()} activeOpacity={0.82}>
                <Text style={styles.loginButtonText}>RETRY SESSION</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.logoutButton} onPress={() => void handleLogout()} activeOpacity={0.8}>
                <Text style={styles.logoutText}>Sign out</Text>
              </TouchableOpacity>
            </View>
          ) : profile && token ? (
            <View style={styles.profileCard}>
              <View style={styles.profileTop}>
                <View style={styles.avatar}><Ionicons name="person" size={27} color="#FFFFFF" /></View>
                <View style={styles.profileHeading}>
                  <Text style={styles.name}>{profile.name}</Text>
                  {!!profile.role && <Text style={styles.role}>{profile.role}</Text>}
                  {!!profile.email && <Text style={styles.email}>{profile.email}</Text>}
                </View>
              </View>
              <View style={styles.protectedBadge}>
                <Ionicons name="shield-checkmark" size={16} color="#11825D" />
                <Text style={styles.protectedText}>
                  {isDemoMode ? 'Demo protected session active' : 'Protected session active'}
                  {profile.role ? ` · ${profile.role}` : ''}
                </Text>
              </View>
              <Text style={styles.sectionLabel}>ACADEMIC PROFILE</Text>
              <View style={styles.details}>
                <ProfileRow icon="id-card-outline" label="Student ID" value={profile.studentId} />
                <ProfileRow icon="school-outline" label="Program" value={profile.program} />
                <ProfileRow icon="layers-outline" label="Year level" value={profile.yearLevel} />
              </View>
              {canViewGrades && (
                <TouchableOpacity style={styles.gradesButton} onPress={() => router.push('/grades')} activeOpacity={0.82}>
                  <Ionicons name="document-text-outline" size={19} color={C.blue} />
                  <Text style={styles.gradesButtonText}>View grades</Text>
                  <Ionicons name="chevron-forward" size={18} color={C.muted} />
                </TouchableOpacity>
              )}
              <TouchableOpacity style={styles.logoutButton} onPress={() => void handleLogout()} disabled={loading} activeOpacity={0.8}>
                <Ionicons name="log-out-outline" size={19} color={C.navy} />
                <Text style={styles.logoutText}>Log out</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.card}>
              <View style={styles.loginIcon}><Ionicons name="lock-closed" size={23} color={C.cyan} /></View>
              <Text style={styles.cardTitle}>Welcome back</Text>
              <Text style={styles.cardSubtitle}>Use your student account to continue.</Text>

              <Text style={styles.label}>SCHOOL EMAIL</Text>
              <View style={styles.inputWrap}>
                <Ionicons name="mail-outline" size={18} color={C.muted} />
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="you@school.edu"
                  placeholderTextColor="#9AA8BA"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  textContentType="emailAddress"
                  editable={!loading}
                />
              </View>
              <Text style={styles.label}>PASSWORD</Text>
              <View style={styles.inputWrap}>
                <Ionicons name="key-outline" size={18} color={C.muted} />
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  placeholderTextColor="#9AA8BA"
                  secureTextEntry
                  autoCapitalize="none"
                  textContentType="password"
                  onSubmitEditing={() => void handleLogin()}
                  editable={!loading}
                />
              </View>

              {!!error && (
                <View style={styles.errorBox}>
                  <Ionicons name="alert-circle-outline" size={18} color={C.danger} />
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              )}

              <TouchableOpacity style={[styles.loginButton, loading && styles.disabled]} onPress={() => void handleLogin()} disabled={loading} activeOpacity={0.82}>
                {loading ? <ActivityIndicator color="#FFFFFF" /> : <><Text style={styles.loginButtonText}>SIGN IN</Text><Ionicons name="arrow-forward" size={18} color="#FFFFFF" /></>}
              </TouchableOpacity>
              <View style={styles.secureNote}>
                <Ionicons name="shield-checkmark-outline" size={16} color={C.muted} />
                <Text style={styles.secureNoteText}>Your session is stored securely on this device.</Text>
              </View>
              {isDemoMode && (
                <View style={styles.configBox}>
                  <Text style={styles.configTitle}>Demo mode · use these credentials</Text>
                  <Text style={styles.configText}>Email: {DEMO_CREDENTIALS.email}{'\n'}Password: {DEMO_CREDENTIALS.password}{'\n'}Demo session lasts 8 hours. Add your API URL to switch to a real backend.</Text>
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function ProfileRow({ icon, label, value }: { icon: React.ComponentProps<typeof Ionicons>['name']; label: string; value?: string }) {
  return (
    <View style={styles.row}>
      <Ionicons name={icon} size={18} color={C.blue} />
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value || '—'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: C.background },
  flex: { flex: 1 },
  scroll: { flexGrow: 1, width: '100%', maxWidth: 620, alignSelf: 'center', padding: 24, paddingTop: 38, justifyContent: 'center' },
  heading: { marginBottom: 24 },
  eyebrow: { color: '#47889E', fontSize: 10, fontWeight: '800', letterSpacing: 1.8 },
  title: { color: C.ink, fontSize: 29, fontWeight: '800', marginTop: 7 },
  subtitle: { color: C.muted, fontSize: 14, marginTop: 6 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 24, borderWidth: 1, borderColor: C.border, shadowColor: C.navy, shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.07, shadowRadius: 20, elevation: 4 },
  loadingText: { color: C.muted, textAlign: 'center', marginTop: 15, fontSize: 14 },
  loginIcon: { width: 48, height: 48, borderRadius: 16, backgroundColor: '#DDF5F8', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  cardTitle: { color: C.ink, fontSize: 22, fontWeight: '800' },
  cardSubtitle: { color: C.muted, fontSize: 13, marginTop: 5, marginBottom: 24 },
  label: { color: '#53647C', fontSize: 10, fontWeight: '800', letterSpacing: 1.2, marginBottom: 8, marginTop: 14 },
  inputWrap: { minHeight: 52, borderWidth: 1, borderColor: C.border, borderRadius: 14, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 11, backgroundColor: '#FBFCFE' },
  input: { flex: 1, color: C.ink, fontSize: 15, paddingVertical: 12 },
  errorBox: { flexDirection: 'row', gap: 9, alignItems: 'flex-start', borderRadius: 12, backgroundColor: '#FFF1F2', padding: 12, marginTop: 16 },
  errorText: { color: C.danger, flex: 1, fontSize: 13, lineHeight: 19 },
  loginButton: { height: 54, borderRadius: 15, backgroundColor: '#079FC1', marginTop: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  disabled: { opacity: 0.7 },
  loginButtonText: { color: '#FFFFFF', fontSize: 13, fontWeight: '800', letterSpacing: 1.2 },
  secureNote: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 18 },
  secureNoteText: { color: C.muted, fontSize: 11 },
  configBox: { backgroundColor: '#FFF8E8', borderRadius: 12, padding: 13, marginTop: 16 },
  configTitle: { color: '#785500', fontWeight: '800', fontSize: 12 },
  configText: { color: '#785500', fontSize: 12, lineHeight: 18, marginTop: 3 },
  profileCard: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 22, borderWidth: 1, borderColor: C.border, shadowColor: C.navy, shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.07, shadowRadius: 20, elevation: 4 },
  profileTop: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  avatar: { width: 58, height: 58, borderRadius: 19, backgroundColor: C.blue, alignItems: 'center', justifyContent: 'center' },
  profileHeading: { flex: 1 },
  name: { color: C.ink, fontWeight: '800', fontSize: 19 },
  role: { color: '#11825D', fontSize: 11, fontWeight: '800', textTransform: 'uppercase', marginTop: 3 },
  email: { color: C.muted, fontSize: 12, marginTop: 4 },
  protectedBadge: { flexDirection: 'row', alignItems: 'center', gap: 7, backgroundColor: '#EAF8F0', borderRadius: 11, paddingHorizontal: 12, paddingVertical: 10, alignSelf: 'flex-start', marginTop: 19 },
  protectedText: { color: '#11825D', fontSize: 12, fontWeight: '700' },
  sectionLabel: { color: '#53647C', fontSize: 10, fontWeight: '800', letterSpacing: 1.2, marginTop: 26, marginBottom: 7 },
  details: { borderTopWidth: 1, borderTopColor: C.border },
  row: { minHeight: 51, borderBottomWidth: 1, borderBottomColor: C.border, flexDirection: 'row', alignItems: 'center', gap: 11 },
  rowLabel: { color: C.muted, fontSize: 13, flex: 1 },
  rowValue: { color: C.ink, fontSize: 13, fontWeight: '700', textAlign: 'right', maxWidth: '52%' },
  logoutButton: { height: 50, borderRadius: 14, borderWidth: 1, borderColor: C.border, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9, marginTop: 23 },
  logoutText: { color: C.navy, fontSize: 14, fontWeight: '800' },
  gradesButton: { height: 52, borderRadius: 14, borderWidth: 1, borderColor: C.border, flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 18, paddingHorizontal: 14 },
  gradesButtonText: { color: C.navy, fontSize: 14, fontWeight: '800', flex: 1 },
});
