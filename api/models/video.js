var mongoose =  require('mongoose');

var videoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    video_url: String,
});


module.exports = mongoose.model('Video', videoSchema);