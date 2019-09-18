const express = require("express");
const router = express.Router();

const controller = require("../controllers/categories");

router.route("/")
    .get(controller.get_categories)
    .post(controller.add_category);

module.exports = router;