import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type Quote = { quote: string; author: string };

const FALLBACK_QUOTE: Quote = {
  quote: 'The secret of getting ahead is getting started.',
  author: 'Mark Twain',
};

export default function QuotesScreen() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchQuote = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch('https://dummyjson.com/quotes/random');
      if (!response.ok) throw new Error(`Quote request failed (${response.status})`);
      const data: Quote = await response.json();
      if (!data?.quote || !data?.author) throw new Error('Invalid quote response');
      setQuote({ quote: data.quote, author: data.author });
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void fetchQuote(); }, [fetchQuote]);

  const displayedQuote = quote ?? FALLBACK_QUOTE;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <View style={styles.topLine} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.heading}>
            <Text style={styles.eyebrow}>BEGINNER PROJECT</Text>
            <Text style={styles.title}>Quotes App</Text>
            <Text style={styles.subtitle}>A little inspiration for your day</Text>
          </View>

          <View style={styles.quoteCard}>
            <Text style={styles.cardLabel}>QUOTE OF THE DAY</Text>
            {loading ? (
              <View style={styles.statusArea}>
                <ActivityIndicator size="large" color={COLORS.cyan} />
                <Text style={styles.statusText}>Loading a quote…</Text>
              </View>
            ) : (
              <View style={styles.quoteBody}>
                {error && (
                  <Text style={styles.errorText}>
                    {quote ? 'Could not refresh the quote. Showing the last one.' : 'Could not get a quote. Showing a sample instead.'}
                  </Text>
                )}
                <Text style={styles.quoteMark}>“</Text>
                <Text style={styles.quoteText}>{displayedQuote.quote}</Text>
                <View style={styles.authorRow}>
                  <View style={styles.authorRule} />
                  <Text style={styles.authorText}>{displayedQuote.author}</Text>
                </View>
              </View>
            )}
            <View style={styles.cardFooter}>
              <Text style={styles.footerText}>WORDS TO LIVE BY</Text>
              <Ionicons name="sparkles-outline" size={17} color="#AFC5E3" />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={() => void fetchQuote()}
            disabled={loading}
            activeOpacity={0.82}
            accessibilityRole="button"
            accessibilityLabel={error ? 'Try loading another quote' : 'Get a new quote'}
          >
            {loading ? <ActivityIndicator size="small" color="#FFFFFF" /> : (
              <>
                <Ionicons name="shuffle-outline" size={19} color="#FFFFFF" />
                <Text style={styles.buttonText}>{error ? 'TRY AGAIN' : 'NEW QUOTE'}</Text>
              </>
            )}
          </TouchableOpacity>

          <View style={styles.tipRow}>
            <View style={styles.tipDot} />
            <Text style={styles.tipText}>Take what you need. Keep moving forward.</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const COLORS = {
  background: '#F3F6FA',
  ink: '#17253D',
  muted: '#71819A',
  navy: '#102E60',
  cyan: '#20B8D2',
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  topLine: { height: 5, backgroundColor: COLORS.cyan },
  scrollContent: { flexGrow: 1, justifyContent: 'center' },
  content: { width: '100%', maxWidth: 620, alignSelf: 'center', paddingHorizontal: 24, paddingVertical: 30 },
  heading: { marginBottom: 23 },
  eyebrow: { color: '#47889E', fontSize: 10, fontWeight: '800', letterSpacing: 1.8 },
  title: { color: COLORS.ink, fontSize: 30, fontWeight: '900', marginTop: 6 },
  subtitle: { color: COLORS.muted, fontSize: 13, marginTop: 5 },
  quoteCard: {
    minHeight: 340,
    backgroundColor: COLORS.navy,
    borderRadius: 24,
    paddingHorizontal: 25,
    paddingTop: 25,
    paddingBottom: 18,
    shadowColor: COLORS.navy,
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 7,
  },
  cardLabel: { color: COLORS.cyan, fontSize: 12, fontWeight: '800', letterSpacing: 0.8, textAlign: 'center' },
  quoteBody: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 15 },
  quoteMark: { color: COLORS.cyan, fontSize: 60, fontWeight: '900', lineHeight: 65, height: 45 },
  quoteText: { color: '#FFFFFF', fontSize: 25, lineHeight: 34, fontWeight: '800', textAlign: 'center' },
  authorRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9, marginTop: 20 },
  authorRule: { width: 20, height: 1, backgroundColor: COLORS.cyan },
  authorText: { color: '#D0DCEE', fontSize: 14, fontWeight: '600' },
  statusArea: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  statusText: { color: '#DCE6F4', fontSize: 14, marginTop: 13 },
  errorText: { color: '#FFD8B0', fontSize: 12, textAlign: 'center', lineHeight: 18, marginBottom: 12 },
  cardFooter: { borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.16)', paddingTop: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  footerText: { color: '#AFC5E3', fontSize: 9, fontWeight: '800', letterSpacing: 1.4 },
  button: { height: 54, borderRadius: 17, backgroundColor: '#079FC1', marginTop: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9 },
  buttonDisabled: { opacity: 0.7 },
  buttonText: { color: '#FFFFFF', fontSize: 12, fontWeight: '900', letterSpacing: 1.1 },
  tipRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 23 },
  tipDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.cyan },
  tipText: { color: COLORS.muted, fontSize: 11 },
});
