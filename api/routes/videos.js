var express = require("express");
var router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "video/mp4" || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage })

const videosController = require('../controllers/videos');

router
  .route("/")
  //This endpoint returns all the videos in the database
  .get(videosController.get_videos)
  //This endpoint add video to the database
  .post(upload.single('video'), videosController.add_video);

router
  .route("/:videoId")
  //This endpoint return a video with a particular id pass through the url
  .get(videosController.get_video)
  //This endpoint updates a video with a given id in the database
  .patch(videosController.update_video)
  ///This endpoint Deletes a video with a given id from the database
  .delete(videosController.delete_video);

module.exports = router;
