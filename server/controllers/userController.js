import User from "../models/User.js";
import Event from "../models/Event.js";
import RSVP from "../models/RSVP.js";
import Group from "../models/Group.js";
import Notification from "../models/Notification.js";

const publicUser = (user) => ({
  _id: user._id,
  id: user._id,
  name: user.name,
  email: user.email,
  location: user.location,
  bio: user.bio || "",
  hobbies: user.hobbies || [],
  role: user.role,
  achievements: user.achievements || [],
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

export async function profile(req, res) {
  const user = await User.findById(req.user._id).select("-password").lean();

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const results = await Promise.allSettled([
    RSVP.countDocuments({ user: req.user._id, status: "going" }),
    Event.countDocuments({ creator: req.user._id }),
    Group.countDocuments({ "members.user": req.user._id }),
    RSVP.distinct("event", { user: req.user._id }).then((events) => events.length),
  ]);

  const value = (index) => results[index].status === "fulfilled" ? results[index].value : 0;
  const eventsJoined = value(0);
  const eventsCreated = value(1);
  const groupsJoined = value(2);
  const peopleInteracted = value(3);

  return res.json({
    success: true,
    user: {
      ...publicUser(user),
      stats: {
        eventsJoined,
        eventsCreated,
        groupsJoined,
        peopleInteracted,
      },
    },
  });
}

export async function updateProfile(req, res) {
  const allowed = ["name", "location", "bio", "hobbies"];
  const data = {};

  allowed.forEach((key) => {
    if (req.body[key] !== undefined) data[key] = req.body[key];
  });

  if (data.name !== undefined) {
    data.name = String(data.name).trim();
    if (data.name.length < 2 || data.name.length > 80) {
      return res.status(400).json({
        success: false,
        message: "Name must be between 2 and 80 characters",
      });
    }
  }

  if (data.location !== undefined) {
    data.location = String(data.location).trim();
    if (!data.location) {
      return res.status(400).json({
        success: false,
        message: "Location is required",
      });
    }
  }

  if (data.bio !== undefined) {
    data.bio = String(data.bio).trim();
    if (data.bio.length > 300) {
      return res.status(400).json({
        success: false,
        message: "Bio cannot exceed 300 characters",
      });
    }
  }

  if (data.hobbies !== undefined && !Array.isArray(data.hobbies)) {
    return res.status(400).json({
      success: false,
      message: "Hobbies must be an array",
    });
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    data,
    {
      new: true,
      runValidators: true,
    }
  ).select("-password");

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  return res.json({
    success: true,
    message: "Profile updated successfully",
    user: publicUser(user),
  });
}

export async function notifications(req, res) {
  const items = await Notification.find({ user: req.user._id })
    .sort("-createdAt")
    .limit(50);

  return res.json({
    success: true,
    notifications: items,
  });
}
