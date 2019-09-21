const express = require("express");
const router = express.Router();

const controller = require('../controllers/subCategories');

router.route("/")
    .get(controller.get_subCategories)
    .post(controller.add_subCategories);

module.exports = router;