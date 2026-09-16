export interface EventItem {
  id: string;
  title: string;
  category: string;
  dateTime: string;
  venue: string;
  description: string;
  isJoined?: boolean;
}

export const INITIAL_EVENTS: EventItem[] = [
  { id: '1', title: 'Tech Summit 2026', category: 'Academic', dateTime: 'Oct 15 - 10:00 AM', venue: 'Auditorium', description: 'Tech conference on React Native.', isJoined: false },
  { id: '2', title: 'Esports League', category: 'Gaming', dateTime: 'Oct 18 - 1:00 PM', venue: 'Student Center', description: 'MLBB Tournament.', isJoined: true },
  { id: '3', title: 'Indie Band Night', category: 'Cultural', dateTime: 'Oct 22 - 6:00 PM', venue: 'Open Field', description: 'Campus band show.', isJoined: false },
  { id: '4', title: 'Hackathon 24H', category: 'Academic', dateTime: 'Nov 02 - 8:00 AM', venue: 'IT Lab', description: 'Coding competition.', isJoined: false },
  { id: '5', title: 'Basketball Finals', category: 'Sports', dateTime: 'Nov 10 - 3:00 PM', venue: 'Gymnasium', description: 'Championship match.', isJoined: false },
];
