import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { events } from "../../data/events";

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const event = events.find((item) => item.id === id);
  const [joined, setJoined] = useState(event?.joined ?? false);
  if (!event)
    return (
      <View style={styles.empty}>
        <Ionicons name="search-outline" size={45} color="#8B95A7" />
        <Text style={styles.emptyTitle}>Event not found</Text>
        <Text style={styles.emptyText}>
          This event may have moved or the link is incorrect.
        </Text>
        <Pressable
          onPress={() =>
            router.canGoBack() ? router.back() : router.replace("/events")
          }
          style={styles.backButton}
        >
          <Text style={styles.backText}>Go back</Text>
        </Pressable>
      </View>
    );
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.category}>
        <Text style={styles.categoryText}>{event.category.toUpperCase()}</Text>
      </View>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.description}>{event.description}</Text>
      <View style={styles.info}>
        <Ionicons name="calendar-outline" size={22} color="#4F46E5" />
        <View>
          <Text style={styles.infoLabel}>WHEN</Text>
          <Text style={styles.infoValue}>{event.dateTime}</Text>
        </View>
      </View>
      <View style={styles.info}>
        <Ionicons name="location-outline" size={22} color="#4F46E5" />
        <View>
          <Text style={styles.infoLabel}>WHERE</Text>
          <Text style={styles.infoValue}>{event.venue}</Text>
        </View>
      </View>
      <Pressable
        onPress={() => setJoined((value) => !value)}
        style={({ pressed }) => [
          styles.action,
          joined && styles.actionJoined,
          pressed && styles.pressed,
        ]}
      >
        <Ionicons
          name={joined ? "checkmark-circle" : "add-circle-outline"}
          size={21}
          color="#fff"
        />
        <Text style={styles.actionText}>
          {joined ? "Leave event" : "Join event"}
        </Text>
      </Pressable>
      <Text style={styles.status}>
        {joined
          ? "You’re on the guest list. See you there!"
          : "Join to add this to your campus plans."}
      </Text>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  page: {
    padding: 20,
    paddingBottom: 32,
    backgroundColor: "#FFFFFF",
    flexGrow: 1,
  },
  category: {
    alignSelf: "flex-start",
    backgroundColor: "#E7F1FF",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  categoryText: {
    color: "#007AFF",
    fontSize: 12,
    fontWeight: "600",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#212529",
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: "#495057",
    lineHeight: 22,
    marginBottom: 24,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 12,
    color: "#6C757D",
    fontWeight: "600",
  },
  infoValue: {
    fontSize: 14,
    color: "#495057",
    marginTop: 2,
  },
  action: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  actionJoined: {
    backgroundColor: "#DC3545",
  },
  pressed: {
    opacity: 0.7,
  },
  actionText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  status: {
    color: "#6C757D",
    textAlign: "center",
    marginTop: 12,
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#212529",
    marginTop: 12,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: "#6C757D",
    textAlign: "center",
    marginBottom: 12,
  },
  backButton: {
    backgroundColor: "#6C757D",
    padding: 10,
    borderRadius: 6,
  },
  backText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
