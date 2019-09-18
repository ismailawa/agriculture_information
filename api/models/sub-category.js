const mongoose = require('mongoose');

const subCategorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    tag: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }
});


module.exports = mongoose.model("SubCategory", subCategorySchema);