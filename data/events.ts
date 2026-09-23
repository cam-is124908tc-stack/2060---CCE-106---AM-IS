export type EventCategory = "Academic" | "Community" | "Sports";

export type CampusEvent = {
  id: string;
  title: string;
  category: EventCategory;
  dateTime: string;
  venue: string;
  description: string;
  joined: boolean;
};

export const events: CampusEvent[] = [
  {
    id: "design-jam",
    title: "Design Jam: Better Campus",
    category: "Academic",
    dateTime: "Oct 14 · 4:00 PM",
    venue: "Innovation Hub",
    description:
      "Bring a problem from campus and prototype a small, thoughtful solution with other students.",
    joined: true,
  },
  {
    id: "sunrise-run",
    title: "Sunrise Social Run",
    category: "Sports",
    dateTime: "Oct 16 · 6:30 AM",
    venue: "East Field Gate",
    description:
      "An easy, all-pace morning run followed by coffee and conversation.",
    joined: false,
  },
  {
    id: "makers-market",
    title: "Student Makers Market",
    category: "Community",
    dateTime: "Oct 17 · 11:00 AM",
    venue: "Campus Green",
    description:
      "Meet student makers, browse handmade goods, and support creative campus projects.",
    joined: false,
  },
  {
    id: "research-night",
    title: "Research Lightning Night",
    category: "Academic",
    dateTime: "Oct 18 · 5:30 PM",
    venue: "Science Theatre",
    description:
      "Hear short, accessible talks from student researchers across disciplines.",
    joined: true,
  },
  {
    id: "climb-clinic",
    title: "Indoor Climb Clinic",
    category: "Sports",
    dateTime: "Oct 20 · 3:00 PM",
    venue: "Recreation Centre",
    description:
      "Learn safe climbing basics with coaches. Equipment is provided for first-timers.",
    joined: false,
  },
  {
    id: "garden-day",
    title: "Community Garden Day",
    category: "Community",
    dateTime: "Oct 22 · 9:00 AM",
    venue: "North Garden",
    description:
      "Help plant herbs, meet neighbours, and take home a small starter plant.",
    joined: false,
  },
];
