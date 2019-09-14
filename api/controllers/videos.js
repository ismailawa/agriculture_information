const mongoose = require("mongoose");

const Video = require("../models/video");

exports.get_videos = (req, res, next) => {
    Video.find()
        .select("name video_url")
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });
};

exports.add_video = (req, res, next) => {
    var video = new Video({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        video_url: req.body.video_url
    });

    video
        .save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.get_video = (req, res, next) => {
    var id = req.params.videoId;
    Video.findById(id)
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({
                    message: "No valid entry found for the provided ID"
                });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

exports.update_video = (req, res, next) => {
    var videoId = req.params.videoId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Video.update({
            _id: videoId
        }, {
            $set: updateOps
        })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(error => {
            res.status(500).json({
                error: error
            })
        });
};

exports.delete_video = (req, res, next) => {
    var videoId = req.params.videoId;
    Video.remove({ _id: videoId })
      .exec()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(error => {
        res.status(500).json({ error: error });
      });
  };