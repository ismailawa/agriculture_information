var mongoose = require('mongoose');

var videoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    video_url: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }

});

module.exports = mongoose.model('Video', videoSchema);