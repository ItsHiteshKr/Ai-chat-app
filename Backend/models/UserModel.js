const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');


const userSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },

        pic: {
            type: String,
            default: ""
        },
    },
    {
        timestamps: true,
    }
);

// Login ke time password compare karne ke liye
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Save se pehle password hash karo (sirf jab password change ho)
userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;