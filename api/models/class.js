const mongoose = require('mongoose');

const classSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    tag: String,
    subCategory: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" }
});

module.exports = mongoose.model("Class", classSchema);