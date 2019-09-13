var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Video = require('../models/video');

router.route('/')
    .get(function (req, res, next) {
        res.send({ 'working': "working" });
    })
    .post(function (req, res, next) {
        var video = new Video({
            _id: mongoose.Types.ObjectId(),
            name: req.body.name,
            video_url: req.body.video_url
        });

        video.save().then(result => {
            res.status(201).json(
                result
            );
        }).catch((err)=>{
            res.status(500).json({error: err});
        });
    });

router.route('/:videoId')
    .get((req, res, next) => {
        var id = req.params.videoId;
        Video.findById(id)
        .exec()
        .then((doc)=>{
            if(doc){
                res.status(200).json(doc);
            }else{
                res.status(404).json({message: "No valid entry found for the provided ID"});
            }
        })
        .catch((error)=>{
            res.status(500).json(error);
        });

    });


module.exports = router;