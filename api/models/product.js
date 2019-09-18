const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    type: String,
    description: String,
    image_url: String,
    available: { type: Boolean, default: true },
    prize: Number,
    video: { type: mongoose.Schema.Types.ObjectId, ref: "Video" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }

});

module.exports = mongoose.model("Product", productSchema);