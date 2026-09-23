import { StyleSheet, Text, View } from "react-native";

type StatCardProps = { label: string; value: string; accent: string };

export function StatCard({ label, value, accent }: StatCardProps) {
  return (
    <View style={[styles.card, { borderTopColor: accent }]}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    borderTopWidth: 4,
    padding: 16,
    minWidth: 148,
    flexGrow: 1,
    shadowColor: "#172B4D",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2,
  },
  value: {
    color: "#14213D",
    fontSize: 30,
    fontWeight: "800",
  },
  label: {
    color: "#667085",
    fontSize: 13,
    fontWeight: "600",
    marginTop: 4,
  },
});
