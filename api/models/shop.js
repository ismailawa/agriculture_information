const mongoose = require('mongoose');

const shopSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    address: { type: String },
    image_url: { type: String },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    products: { type: mongoose.Types.ObjectId, ref: "Product" }

});

module.exports = mongoose.model('Shop', shopSchema);