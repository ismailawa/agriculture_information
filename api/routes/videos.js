var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

var Video = require("../models/video");

router
  .route("/")
  //This endpoint returns all the videos in the database
  .get(function(req, res, next) {
    Video.find()
      .exec()
      .then(doc => {
        console.log(doc);
        res.status(200).json(doc);
      })
      .catch(error => {
        res.status(500).json({ error: error });
      });
  })
  //This endpoint add video to the database
  .post(function(req, res, next) {
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
  });

router
  .route("/:videoId")
  //This endpoint return a video with a particular id pass through the url
  .get((req, res, next) => {
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
  })
  //This endpoint updates a video with a given id in the database
  .patch((req, res, next) => {
    var videoId = req.params.videoId;
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    Video.update({ _id: videoId }, { $set: updateOps })
      .exec()
      .then(result => {
        res.status(200).json(result)
      })
      .catch(error=> {
        res.status(500).json({error:error})
      });
  })
  ///This endpoint Deletes a video with a given id from the database
  .delete((req, res, next) => {
    var videoId = req.params.videoId;
    Video.remove({ _id: videoId })
      .exec()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(error => {
        res.status(500).json({ error: error });
      });
  });

module.exports = router;
