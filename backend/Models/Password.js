const mongoose = require("mongoose");

const passwordSchema = new mongoose.Schema({
  website: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, { timestamps: true });

const Password = mongoose.model("Password", passwordSchema);

module.exports = Password;
