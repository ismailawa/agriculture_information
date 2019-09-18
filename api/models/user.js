const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userName: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    image_url: String,
    password: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);