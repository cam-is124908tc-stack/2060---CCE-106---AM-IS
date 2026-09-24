import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getCurrentUser, loginUser, type UserProfile } from '@/services/authService';
import { deleteToken, getToken, saveToken } from '@/storage/tokenStorage';

const COLORS = {
  ink: '#15233B', muted: '#748198', pink: '#C13584', purple: '#833AB4', orange: '#F77737',
  line: '#E3E9F2', soft: '#F5F8FD', green: '#16845C', red: '#C34444', white: '#FFFFFF',
};

function friendlyError(error: unknown) {
  if (error instanceof TypeError) return 'Could not reach the practice API. Check your internet connection and try again.';
  if (error instanceof Error) {
    if (/username|password|invalid|credentials/i.test(error.message)) return 'Login failed. Check your username and password.';
    return error.message;
  }
  return 'Something went wrong. Please try again.';
}

function BrandMark() {
  return (
    <View style={styles.brandRow}>
      <View style={styles.brandIcon}><Text style={styles.brandGlyph}>S</Text><View style={styles.brandDot} /></View>
      <Text style={styles.brandName}>secure<Text style={styles.brandSpace}>space</Text></Text>
    </View>
  );
}

export default function HomeScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [busy, setBusy] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const restoreSession = useCallback(async () => {
    setBusy(true);
    try {
      const token = await getToken();
      if (token) {
        try {
          setProfile(await getCurrentUser(token));
        } catch {
          await deleteToken();
          setProfile(null);
          setError('Your saved session expired. Please sign in again.');
        }
      }
    } catch {
      setError('We could not check your saved session. Please try again.');
    } finally {
      setBusy(false);
    }
  }, []);

  useEffect(() => { void restoreSession(); }, [restoreSession]);

  const handleLogin = async () => {
    if (!username.trim() || !password) {
      setError('Enter both your username and password to continue.');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      const session = await loginUser(username.trim(), password);
      await saveToken(session.token);
      const currentUser = await getCurrentUser(session.token);
      setProfile(currentUser);
      setPassword('');
    } catch (cause) {
      setError(friendlyError(cause));
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = async () => {
    setError('');
    try {
      await deleteToken();
      setProfile(null);
      setUsername('');
      setPassword('');
    } catch {
      setError('Could not clear the saved session. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.page}>
            <View style={styles.topBar}>
              <BrandMark />
              <View style={styles.securePill}><View style={styles.secureDot} /><Text style={styles.securePillText}>SECURE PORTAL</Text></View>
            </View>

            {busy ? (
              <View style={styles.loadingCard}>
                <View style={styles.loadingIcon}><ActivityIndicator color={COLORS.pink} /></View>
                <Text style={styles.loadingTitle}>Checking your session</Text>
                <Text style={styles.loadingText}>Keeping your account protected.</Text>
              </View>
            ) : profile ? (
              <View style={styles.profileCard}>
                <View style={styles.profileTopline}><Text style={styles.eyebrow}>YOUR ACCOUNT</Text><View style={styles.activePill}><View style={styles.activeDot} /><Text style={styles.activeText}>ACTIVE</Text></View></View>
                <View style={styles.profileIdentity}>
                  {profile.image ? <Image source={{ uri: profile.image }} style={styles.avatar} /> : <View style={[styles.avatar, styles.avatarFallback]}><Text style={styles.avatarInitial}>{profile.firstName?.[0] ?? 'U'}</Text></View>}
                  <View style={styles.identityText}><Text style={styles.profileName}>{profile.firstName} {profile.lastName}</Text><Text style={styles.profileHandle}>@{profile.username}</Text></View>
                </View>
                <View style={styles.divider} />
                <Text style={styles.detailsLabel}>PROFILE DETAILS</Text>
                <View style={styles.detailRow}><View style={styles.detailIcon}><Text style={styles.detailGlyph}>@</Text></View><View><Text style={styles.detailCaption}>EMAIL ADDRESS</Text><Text style={styles.detailValue}>{profile.email}</Text></View></View>
                <View style={styles.detailRow}><View style={styles.detailIcon}><Text style={styles.detailGlyph}>#</Text></View><View><Text style={styles.detailCaption}>USER ID</Text><Text style={styles.detailValue}>{profile.id}</Text></View></View>
                <View style={styles.protectedNote}><Text style={styles.noteCheck}>✓</Text><Text style={styles.noteText}>Your profile was loaded over a protected session.</Text></View>
                <Pressable style={({ pressed }) => [styles.logoutButton, pressed && styles.buttonPressed]} onPress={() => void handleLogout()}>
                  <Text style={styles.logoutGlyph}>↪</Text><Text style={styles.logoutText}>Log out</Text>
                </Pressable>
              </View>
            ) : (
              <View style={styles.loginCard}>
                <View style={styles.cardAccent}><View style={styles.accentPurple} /><View style={styles.accentPink} /><View style={styles.accentOrange} /></View>
                <View style={styles.welcomeIcon}><Text style={styles.welcomeGlyph}>↗</Text></View>
                <Text style={styles.eyebrow}>WELCOME BACK</Text>
                <Text style={styles.title}>Your profile,{ '\n' }protected.</Text>
                <Text style={styles.subtitle}>Sign in to securely access your personal space.</Text>

                <View style={styles.form}>
                  <Text style={styles.label}>Username</Text>
                  <View style={styles.inputWrap}><Text style={styles.inputIcon}>◎</Text><TextInput accessibilityLabel="Username" autoCapitalize="none" autoCorrect={false} value={username} onChangeText={setUsername} placeholder="Enter your username" placeholderTextColor="#A2ADBD" style={styles.input} returnKeyType="next" /></View>
                  <View style={styles.labelRow}><Text style={styles.label}>Password</Text><Text style={styles.privateHint}>PRIVATE</Text></View>
                  <View style={styles.inputWrap}><Text style={styles.inputIcon}>⌑</Text><TextInput accessibilityLabel="Password" value={password} onChangeText={setPassword} placeholder="Enter your password" placeholderTextColor="#A2ADBD" style={styles.input} secureTextEntry={!showPassword} autoCapitalize="none" returnKeyType="go" onSubmitEditing={() => void handleLogin()} /><Pressable accessibilityRole="button" accessibilityLabel={showPassword ? 'Hide password' : 'Show password'} onPress={() => setShowPassword(!showPassword)} hitSlop={10}><Text style={styles.showPassword}>{showPassword ? 'HIDE' : 'SHOW'}</Text></Pressable></View>
                  {error ? <View accessibilityRole="alert" style={styles.errorBox}><Text style={styles.errorMark}>!</Text><Text style={styles.errorText}>{error}</Text></View> : null}
                  <Pressable disabled={submitting} style={({ pressed }) => [styles.loginButton, (pressed || submitting) && styles.buttonPressed]} onPress={() => void handleLogin()}>
                    {submitting ? <ActivityIndicator color={COLORS.white} /> : <><Text style={styles.loginButtonText}>Sign in securely</Text><Text style={styles.buttonArrow}>→</Text></>}
                  </Pressable>
                </View>

                <View style={styles.dividerRow}><View style={styles.dividerLine} /><Text style={styles.orText}>PRACTICE ENVIRONMENT</Text><View style={styles.dividerLine} /></View>
                <View style={styles.demoBox}><View style={styles.demoIcon}><Text style={styles.demoGlyph}>i</Text></View><View style={styles.demoCopy}><Text style={styles.demoTitle}>Use test credentials</Text><Text style={styles.demoText}>Username: emilys   ·   Password: emilyspass</Text></View></View>
                <View style={styles.privacyRow}><Text style={styles.privacyLock}>▣</Text><Text style={styles.privacyText}>Access token is stored securely on your device</Text></View>
              </View>
            )}

            <View style={styles.footer}><Text style={styles.footerText}>SECURE BY DESIGN</Text><View style={styles.footerDivider} /><Text style={styles.footerText}>CCE 106 · API AUTHENTICATION LAB</Text></View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 }, safeArea: { flex: 1, backgroundColor: '#F4F7FB' },
  scrollContent: { flexGrow: 1, paddingHorizontal: 22 }, page: { width: '100%', maxWidth: 480, alignSelf: 'center', flex: 1 },
  topBar: { height: 76, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 9 }, brandIcon: { height: 31, width: 31, borderRadius: 10, backgroundColor: COLORS.purple, alignItems: 'center', justifyContent: 'center' },
  brandGlyph: { color: '#fff', fontWeight: '800', fontSize: 19, fontStyle: 'italic' }, brandDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: COLORS.orange, position: 'absolute', right: 5, top: 5 },
  brandName: { color: COLORS.ink, fontSize: 17, fontWeight: '800', letterSpacing: -0.6 }, brandSpace: { color: COLORS.pink }, securePill: { flexDirection: 'row', gap: 6, alignItems: 'center', backgroundColor: '#EAF5F0', paddingHorizontal: 10, paddingVertical: 7, borderRadius: 20 },
  secureDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.green }, securePillText: { color: '#32765E', fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  loginCard: { marginTop: 26, backgroundColor: COLORS.white, borderRadius: 22, padding: 25, overflow: 'hidden', borderWidth: 1, borderColor: '#E9EDF4', shadowColor: '#243A63', shadowOpacity: 0.07, shadowRadius: 24, shadowOffset: { width: 0, height: 10 }, elevation: 3 },
  cardAccent: { position: 'absolute', left: 0, right: 0, top: 0, height: 4, flexDirection: 'row' }, accentPurple: { flex: 1, backgroundColor: COLORS.purple }, accentPink: { flex: 1, backgroundColor: COLORS.pink }, accentOrange: { flex: 1, backgroundColor: COLORS.orange }, welcomeIcon: { height: 43, width: 43, borderRadius: 14, backgroundColor: '#F9ECF4', alignItems: 'center', justifyContent: 'center', marginBottom: 22 },
  welcomeGlyph: { color: COLORS.pink, fontSize: 24, fontWeight: '700' }, eyebrow: { color: COLORS.pink, fontSize: 10, letterSpacing: 1.55, fontWeight: '800' },
  title: { color: COLORS.ink, fontSize: 34, lineHeight: 39, fontWeight: '800', letterSpacing: -1.1, marginTop: 9 }, subtitle: { color: COLORS.muted, fontSize: 14, lineHeight: 21, marginTop: 10 },
  form: { marginTop: 27 }, label: { fontSize: 12, color: '#35435A', fontWeight: '700', marginBottom: 8 }, labelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 18 },
  privateHint: { color: '#97A3B6', fontWeight: '700', fontSize: 9, letterSpacing: 1, marginBottom: 8 }, inputWrap: { height: 51, borderRadius: 11, borderWidth: 1, borderColor: COLORS.line, backgroundColor: '#FBFCFE', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, gap: 10 },
  inputIcon: { color: '#8795AA', fontSize: 18, width: 16, textAlign: 'center' }, input: { flex: 1, height: '100%', color: COLORS.ink, fontSize: 13 }, showPassword: { color: COLORS.pink, fontSize: 9, fontWeight: '800', letterSpacing: 0.7 },
  loginButton: { minHeight: 52, marginTop: 22, backgroundColor: COLORS.pink, borderRadius: 11, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', shadowColor: COLORS.pink, shadowOpacity: 0.22, shadowRadius: 10, shadowOffset: { width: 0, height: 5 }, elevation: 3 },
  loginButtonText: { color: COLORS.white, fontSize: 14, fontWeight: '700' }, buttonArrow: { color: '#D5E2FF', fontSize: 20, position: 'absolute', right: 18 }, buttonPressed: { opacity: 0.78 },
  errorBox: { flexDirection: 'row', alignItems: 'flex-start', gap: 9, backgroundColor: '#FFF2F1', borderWidth: 1, borderColor: '#F4D6D3', borderRadius: 9, padding: 11, marginTop: 13 }, errorMark: { color: COLORS.red, fontWeight: '800', fontSize: 13 }, errorText: { color: '#A63D3B', fontSize: 12, lineHeight: 17, flex: 1 },
  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 24 }, dividerLine: { flex: 1, height: 1, backgroundColor: '#EDF0F5' }, orText: { color: '#98A3B4', fontSize: 8, fontWeight: '800', letterSpacing: 1 },
  demoBox: { marginTop: 16, padding: 12, backgroundColor: '#FBF5F8', borderRadius: 11, flexDirection: 'row', alignItems: 'center', gap: 11, borderWidth: 1, borderColor: '#F3E7ED' }, demoIcon: { width: 26, height: 26, borderRadius: 8, backgroundColor: '#F5E6EF', alignItems: 'center', justifyContent: 'center' }, demoGlyph: { color: COLORS.purple, fontWeight: '800', fontSize: 14 }, demoTitle: { color: '#46546A', fontSize: 10, fontWeight: '700', marginBottom: 3 }, demoText: { color: '#7D899C', fontSize: 10 }, demoCopy: { flex: 1 },
  privacyRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 7, marginTop: 18 }, privacyLock: { color: '#8190A5', fontSize: 11 }, privacyText: { color: '#8793A5', fontSize: 10 },
  footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10, paddingVertical: 23, marginTop: 'auto' }, footerText: { color: '#9AA6B7', fontSize: 8, letterSpacing: 0.8, fontWeight: '700' }, footerDivider: { width: 3, height: 3, borderRadius: 2, backgroundColor: '#BBC4D0' },
  loadingCard: { marginTop: 100, alignItems: 'center', padding: 34, backgroundColor: COLORS.white, borderRadius: 20, borderWidth: 1, borderColor: COLORS.line }, loadingIcon: { width: 54, height: 54, borderRadius: 18, backgroundColor: '#F9ECF4', justifyContent: 'center', marginBottom: 18 }, loadingTitle: { color: COLORS.ink, fontSize: 17, fontWeight: '700' }, loadingText: { color: COLORS.muted, fontSize: 12, marginTop: 7 },
  profileCard: { marginTop: 28, backgroundColor: COLORS.white, borderRadius: 22, padding: 24, borderWidth: 1, borderColor: '#E9EDF4', shadowColor: '#243A63', shadowOpacity: 0.07, shadowRadius: 24, shadowOffset: { width: 0, height: 10 }, elevation: 3 }, profileTopline: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, activePill: { flexDirection: 'row', gap: 6, alignItems: 'center', backgroundColor: '#EAF5F0', paddingHorizontal: 9, paddingVertical: 6, borderRadius: 20 }, activeDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.green }, activeText: { color: COLORS.green, fontSize: 9, fontWeight: '800', letterSpacing: 0.8 },
  profileIdentity: { flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 25 }, avatar: { height: 66, width: 66, borderRadius: 23, backgroundColor: '#F5E6EF' }, avatarFallback: { justifyContent: 'center', alignItems: 'center' }, avatarInitial: { color: COLORS.pink, fontSize: 26, fontWeight: '800' }, identityText: { flex: 1 }, profileName: { color: COLORS.ink, fontSize: 22, fontWeight: '800', letterSpacing: -0.5 }, profileHandle: { color: COLORS.muted, fontSize: 13, marginTop: 4 }, divider: { height: 1, backgroundColor: '#EDF0F5', marginVertical: 23 }, detailsLabel: { color: '#99A4B4', fontSize: 9, fontWeight: '800', letterSpacing: 1.2, marginBottom: 8 },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12 }, detailIcon: { width: 34, height: 34, borderRadius: 11, backgroundColor: '#F1F5FC', justifyContent: 'center', alignItems: 'center' }, detailGlyph: { color: '#667795', fontSize: 14, fontWeight: '700' }, detailCaption: { color: '#99A4B4', fontSize: 8, fontWeight: '800', letterSpacing: 1 }, detailValue: { color: '#334158', fontSize: 13, fontWeight: '600', marginTop: 4 },
  protectedNote: { backgroundColor: '#F0F8F4', borderRadius: 9, padding: 11, flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 9 }, noteCheck: { color: COLORS.green, fontWeight: '800' }, noteText: { color: '#4A7966', fontSize: 10, flex: 1 }, logoutButton: { minHeight: 49, marginTop: 20, borderRadius: 11, borderWidth: 1, borderColor: '#E7EAF0', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }, logoutGlyph: { color: '#52627A', fontSize: 17 }, logoutText: { color: '#394961', fontSize: 13, fontWeight: '700' },
});
