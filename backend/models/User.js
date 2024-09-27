const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  profilePicture: {
    type: String, // URL to the profile picture
    default: "",
  },

  address: {
    type: String,
    default: "",
  },

  phone: {
    type: String,
    default: "",
  },

  dob: {
    type: Date,
  },

  notificationPreferences: {
    emailNotifications: {
      type: Boolean,
      default: true,
    },
    pushNotifications: {
      type: Boolean,
      default: true,
    },
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update `updatedAt` field before saving
UserSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("User", UserSchema);
