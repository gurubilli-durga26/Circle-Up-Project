export const COLORS = {
  bg: "#101010",
  surface: "#1B1B1D",
  surfaceAlt: "#26262A",
  green: "#1B4332",
  trail: "#10B981",
  gold: "#FF8800",
  ink: "#FFFFFF",
  muted: "#6B7280",
  border: "#2A2A2E"
};

export const HOBBIES = [
  { key: "sports", label: "Sports", icon: "🏸" },
  { key: "books", label: "Books", icon: "📖" },
  { key: "tech", label: "Tech", icon: "💻" },
  { key: "trekking", label: "Trekking", icon: "⛰️" },
  { key: "music", label: "Music", icon: "🎵" },
  { key: "art", label: "Art", icon: "🎨" },
  { key: "watchparty", label: "Watch Party", icon: "🎬" },
  { key: "photography", label: "Photography", icon: "📷" }
];

export const CATEGORIES = HOBBIES.map((h) => h.label);
