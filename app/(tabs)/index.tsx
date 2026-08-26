import { Image, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#0F172A', dark: '#0F172A' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      
      <ThemedView style={styles.cardContainer}>
        <ThemedText style={styles.titleText}>
          App Title: EventPulse
        </ThemedText>

        <ThemedView style={styles.row}>
          <ThemedText style={styles.labelText}>Student Name: </ThemedText>
          <ThemedText style={styles.bodyText}>Cesario G. Am-is Jr.</ThemedText>
        </ThemedView>

        <ThemedView style={styles.row}>
          <ThemedText style={styles.labelText}>Course/Section: </ThemedText>
          <ThemedText style={styles.bodyText}>BSIT - 2063 - CEE 106</ThemedText>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText style={styles.labelText}>App Idea:</ThemedText>
          <ThemedText style={styles.bodyText}>
            A campus event tracker app that aggregates all student organization activities, tech seminars, and university workshops with real-time notifications.
          </ThemedText>
        </ThemedView>
      </ThemedView>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#0F172A',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  labelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  bodyText: {
    fontSize: 15,
    color: '#CBD5E1',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  section: {
    gap: 4,
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});