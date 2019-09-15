const express = require("express");
const router = express.Router();
const usersController = require('../controllers/users')


router.route('/')
    .get(usersController.get_users)
    .post(usersController.add_user)

module.exports = router;
