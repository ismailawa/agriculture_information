const express = require("express");
const router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/");
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const upload = multer({ storage: storage })

const usersController = require('../controllers/users')

router.route('/')
    .get(usersController.get_users)
    .post(upload.single("image"), usersController.add_user)

module.exports = router;
