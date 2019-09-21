const mongoose = require('mongoose');

const classSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    tag: String,
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "Subcategory" }
});

module.exports = mongoose.model("Class", classSchema);