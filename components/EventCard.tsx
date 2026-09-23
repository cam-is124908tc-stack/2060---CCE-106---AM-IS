import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { CampusEvent } from "../data/events";

type EventCardProps = { event: CampusEvent; onPress: () => void };
const categoryColors = {
  Academic: "#4F46E5",
  Community: "#0F9D7A",
  Sports: "#E76F51",
};

export function EventCard({ event, onPress }: EventCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Open ${event.title}`}
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.top}>
        <View
          style={[
            styles.badge,
            { backgroundColor: `${categoryColors[event.category]}18` },
          ]}
        >
          <Text
            style={[
              styles.badgeText,
              { color: categoryColors[event.category] },
            ]}
          >
            {event.category}
          </Text>
        </View>
        {event.joined && <Text style={styles.joined}>Joined</Text>}
      </View>
      <Text style={styles.title}>{event.title}</Text>
      <View style={styles.detail}>
        <Ionicons name="calendar-outline" size={16} color="#667085" />
        <Text style={styles.detailText}>{event.dateTime}</Text>
      </View>
      <View style={styles.detail}>
        <Ionicons name="location-outline" size={16} color="#667085" />
        <Text style={styles.detailText}>{event.venue}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    shadowColor: "#172B4D",
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 2,
  },
  pressed: {
    opacity: 0.72,
    transform: [{ scale: 0.99 }],
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  badge: {
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "800",
  },
  joined: {
    color: "#0F9D7A",
    fontSize: 12,
    fontWeight: "800",
  },
  title: {
    color: "#14213D",
    fontSize: 18,
    fontWeight: "800",
    marginTop: 13,
    marginBottom: 12,
  },
  detail: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  detailText: {
    color: "#667085",
    marginLeft: 7,
    fontSize: 14,
  },
});
