import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { EventCard } from "../../components/EventCard";
import { EventCategory, events } from "../../data/events";

const filters: ("All" | EventCategory)[] = [
  "All",
  "Academic",
  "Community",
  "Sports",
];
export default function EventsScreen() {
  const [selected, setSelected] = useState<"All" | EventCategory>("All");
  const visible =
    selected === "All"
      ? events
      : events.filter((event) => event.category === selected);
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Text style={styles.intro}>Find your next campus moment.</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filters}
      >
        {filters.map((filter) => (
          <Pressable
            key={filter}
            onPress={() => setSelected(filter)}
            style={[styles.filter, selected === filter && styles.filterActive]}
          >
            <Text
              style={[
                styles.filterText,
                selected === filter && styles.filterTextActive,
              ]}
            >
              {filter}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
      <Text style={styles.count}>{visible.length} events</Text>
      {visible.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onPress={() =>
            router.push({ pathname: "/event/[id]", params: { id: event.id } })
          }
        />
      ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  page: {
    padding: 20,
    paddingBottom: 32,
  },
  intro: {
    color: "#667085",
    fontSize: 16,
    marginBottom: 18,
  },
  filters: {
    gap: 9,
    paddingBottom: 10,
  },
  filter: {
    borderWidth: 1,
    borderColor: "#DCE2EC",
    paddingVertical: 9,
    paddingHorizontal: 15,
    borderRadius: 99,
    backgroundColor: "#fff",
  },
  filterActive: {
    backgroundColor: "#4F46E5",
    borderColor: "#4F46E5",
  },
  filterText: {
    color: "#526071",
    fontWeight: "700",
  },
  filterTextActive: {
    color: "#fff",
  },
  count: {
    color: "#667085",
    fontSize: 13,
    fontWeight: "700",
    marginVertical: 16,
  },
});
