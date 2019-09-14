var express = require("express");
var router = express.Router();

const videosController =  require('../controllers/videos');

router
  .route("/")
  //This endpoint returns all the videos in the database
  .get(videosController.get_videos)
  //This endpoint add video to the database
  .post(videosController.add_video);

router
  .route("/:videoId")
  //This endpoint return a video with a particular id pass through the url
  .get(videosController.get_video)
  //This endpoint updates a video with a given id in the database
  .patch(videosController.update_video)
  ///This endpoint Deletes a video with a given id from the database
  .delete(videosController.delete_video);

module.exports = router;
