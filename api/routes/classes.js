const express = require("express");
const router = express.Router();

const controller = require('../controllers/classes');

router.route("/")
    .get(controller.get_classes)
    .post(controller.add_class);

module.exports = router;