import "dotenv/config";
import bcrypt from "bcryptjs";
import { connectDB } from "./config/db.js";
import User from "./models/User.js";
import Event from "./models/Event.js";
import Group from "./models/Group.js";
import Membership from "./models/Membership.js";
import RSVP from "./models/RSVP.js";
import Post from "./models/Post.js";

const now = new Date();
const hours = 60 * 60 * 1000;
const days = 24 * hours;
const future = (d, h) => new Date(now.getTime() + d * days + h * hours);
const past = (d, h) => new Date(now.getTime() - d * days - h * hours);

await connectDB();

const password = await bcrypt.hash("CircleUp@123", 12);
const demoUser = await User.findOneAndUpdate(
  { email: "demo@circleup.local" },
  {
    $set: {
      name: "Circle-Up Demo",
      email: "demo@circleup.local",
      password,
      location: "Bangalore, India",
      bio: "Explorer, reader and community builder.",
      hobbies: ["sports", "tech", "trekking", "books"],
      achievements: ["Community Starter", "Event Explorer", "Local Connector"],
    },
  },
  { upsert: true, new: true }
);

const groups = [
  { name: "Bangalore Tennis Club", description: "Weekend tennis sessions and friendly matches for all levels.", location: "Koramangala, Bangalore", category: "Sports", type: "community", imageUrl: "/groups/tennis.svg" },
  { name: "Tech Talk Bangalore", description: "Developers, AI enthusiasts and builders sharing ideas and projects.", location: "HSR Layout, Bangalore", category: "Tech", type: "community", imageUrl: "/groups/tech.svg" },
  { name: "Trek Titans", description: "Find trekking partners and plan safe weekend adventures.", location: "Bangalore", category: "Trekking", type: "community", imageUrl: "/groups/trek.svg" },
  { name: "Bookworms Club", description: "Monthly reading circles and thoughtful book discussions.", location: "Indiranagar, Bangalore", category: "Books", type: "community", imageUrl: "/groups/books.svg" },
  { name: "Sunday Football Lobby", description: "Open football lobby for anyone looking for a weekend game.", location: "Cubbon Park, Bangalore", category: "Sports", type: "lobby", imageUrl: "/events/football.svg" },
  { name: "AI Builders Lobby", description: "A casual lobby for people building AI/ML projects together.", location: "Bangalore", category: "Tech", type: "lobby", imageUrl: "/events/tech.svg" },
];

for (const data of groups) {
  const group = await Group.findOneAndUpdate(
    { name: data.name },
    { $set: { ...data, owner: demoUser._id } },
    { upsert: true, new: true }
  );
  if (!group.members.some((m) => String(m.user) === String(demoUser._id))) {
    group.members.push({ user: demoUser._id, role: "owner" });
    await group.save();
  }
  await Membership.findOneAndUpdate(
    { user: demoUser._id, group: group._id },
    { user: demoUser._id, group: group._id, role: "owner" },
    { upsert: true, new: true }
  );
}

const techGroup = await Group.findOne({ name: "Tech Talk Bangalore" });

// Events deliberately cover all three statuses. The ongoing event is always
// relative to the current time, so it stays in the Ongoing tab when seeded.
const eventData = [
  { title: "Sunset Badminton Match", category: "Sports", location: "Koramangala Indoor Court, Bangalore", startDate: future(2, 2), endDate: future(2, 4), description: "Join us for a friendly badminton session. Open to all skill levels.", capacity: 20, imageUrl: "/events/badminton.svg" },
  { title: "AI & Machine Learning Meetup", category: "Tech", location: "HSR Layout, Bangalore", startDate: future(4, 3), endDate: future(4, 5), description: "Talks, demos and networking for AI and ML enthusiasts.", capacity: 80, group: techGroup?._id, imageUrl: "/events/tech.svg" },
  { title: "Weekend Trek to Nandi Hills", category: "Trekking", location: "Nandi Hills, Chikkaballapur", startDate: future(6, 0), endDate: future(6, 5), description: "Early morning trek with a friendly local group.", capacity: 30, imageUrl: "/events/trekking.svg" },
  { title: "Book Club: Atomic Habits", category: "Books", location: "Indiranagar, Bangalore", startDate: future(8, 3), endDate: future(8, 5), description: "Discuss key ideas and practical takeaways from Atomic Habits.", capacity: 25, imageUrl: "/events/books.svg" },
  { title: "Bangalore Tech Networking - Live Now", category: "Tech", location: "Indiranagar, Bangalore", startDate: new Date(now.getTime() - 1 * hours), endDate: new Date(now.getTime() + 2 * hours), description: "A live networking session for local builders and creators.", capacity: 50, imageUrl: "/events/tech.svg" },
  { title: "Photography Walk", category: "Photography", location: "Cubbon Park, Bangalore", startDate: past(2, 5), endDate: past(2, 2), description: "A relaxed photography walk through Cubbon Park.", capacity: 20, imageUrl: "/events/photo.svg" },
  { title: "Sunday Football Meetup", category: "Sports", location: "Cubbon Park, Bangalore", startDate: past(5, 6), endDate: past(5, 4), description: "Friendly five-a-side football meetup.", capacity: 22, imageUrl: "/events/football.svg" },
  { title: "Community Book Swap", category: "Books", location: "Jayanagar, Bangalore", startDate: past(9, 3), endDate: past(9, 1), description: "Bring a book you loved and swap it with another reader.", capacity: 40, imageUrl: "/events/books.svg" },
];

for (const data of eventData) {
  const event = await Event.findOneAndUpdate(
    { title: data.title },
    { $set: { ...data, creator: demoUser._id, group: data.group ?? null } },
    { upsert: true, new: true }
  );
  await RSVP.findOneAndUpdate(
    { event: event._id, user: demoUser._id },
    { event: event._id, user: demoUser._id, status: "going" },
    { upsert: true, new: true }
  );
}

const posts = [
  "Welcome to Circle-Up! Share what you are interested in and find people nearby.",
  "Who is joining the next badminton session?",
  "Looking for trekking partners for Nandi Hills this weekend.",
];
for (const content of posts) {
  await Post.findOneAndUpdate({ content }, { author: demoUser._id, content }, { upsert: true, new: true });
}

console.log("Circle-Up demo data seeded successfully.");
console.log("Upcoming events: 4 | Ongoing events: 1 | Completed events: 3");
console.log("Communities/lobbies: 6");
console.log("Demo login: demo@circleup.local / CircleUp@123");
process.exit(0);
