const mongoose = require("mongoose");

const userModel = mongoose.Schema(
    {
        name: { type: string, required: true },
        phone_number: { type: string, required: true },
        email: { type: string, required: true, unique: true },
        password: { type: string, required: true },
        pic: { type: string, required: true, default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userModel);

module.exports = User;