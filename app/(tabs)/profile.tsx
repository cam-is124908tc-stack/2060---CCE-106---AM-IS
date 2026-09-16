import React, { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function ProfileScreen() {
  const [fullName, setFullName] = useState('Student Name');
  const [email, setEmail] = useState('student@campus.edu');

  const [savedName, setSavedName] = useState('Student Name');
  const [savedEmail, setSavedEmail] = useState('student@campus.edu');

  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    setErrorMessage('');
    setShowSuccess(false);

    if (!fullName.trim() || !email.trim()) {
      setErrorMessage('Full Name and Email are required.');
      return;
    }

    if (!email.includes('@') || email.indexOf('@') === email.length - 1) {
      setErrorMessage('Please enter a valid email structure.');
      return;
    }

    setSavedName(fullName);
    setSavedEmail(email);
    setShowSuccess(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.headerTitle}>User Profile</Text>

        <View style={styles.profileCard}>
          <View style={styles.avatarPlaceholder} />
          <Text style={styles.savedName}>{savedName}</Text>
          <Text style={styles.savedEmail}>{savedEmail}</Text>
        </View>

        <Text style={styles.formTitle}>Edit Details</Text>

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        {showSuccess ? <Text style={styles.successText}>✓ Profile updated successfully!</Text> : null}

        <Text style={styles.label}>Full Name *</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Enter full name"
          placeholderTextColor="#64748B"
        />

        <Text style={styles.label}>Email Address *</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter email"
          placeholderTextColor="#64748B"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Pressable style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Save Profile</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  content: { padding: 24, paddingTop: 40 },
  headerTitle: { color: '#F8FAFC', fontSize: 24, fontWeight: '900', marginBottom: 20 },
  profileCard: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#334155',
  },
  avatarPlaceholder: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#312E81', marginBottom: 12 },
  savedName: { color: '#F8FAFC', fontSize: 18, fontWeight: '800' },
  savedEmail: { color: '#94A3B8', fontSize: 13 },
  formTitle: { color: '#F8FAFC', fontSize: 16, fontWeight: '800', marginBottom: 12 },
  label: { color: '#94A3B8', fontSize: 12, fontWeight: '700', marginBottom: 6, marginTop: 10 },
  input: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 14,
    color: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#334155',
  },
  saveBtn: { backgroundColor: '#6366F1', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 24 },
  saveBtnText: { color: '#FFFFFF', fontWeight: '800' },
  errorText: { color: '#F43F5E', backgroundColor: '#881337', padding: 10, borderRadius: 8, marginBottom: 10 },
  successText: { color: '#34D399', backgroundColor: '#064E3B', padding: 10, borderRadius: 8, marginBottom: 10 },
});