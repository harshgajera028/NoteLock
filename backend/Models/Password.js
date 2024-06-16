const mongoose = require("mongoose");

// Passwords Collection -> Store and manage passwords for different users
const PasswordSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    website: {
        type: String,
        required: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the user's ID
        ref: "User",
        required: true,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

const Password = mongoose.model("Password", PasswordSchema);
module.exports = Password;
