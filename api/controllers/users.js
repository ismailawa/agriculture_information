var express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");

exports.get_users = (req, res, next) => {
    User.find()
        .exec()
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((error) => {
            res.status(500).json({ error })
        });
};

exports.add_user = (req, res, next) => {
    const user = new User({
        _id: mongoose.Types.ObjectId(),
        userName: req.body.userName,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password
    });

    user
        .save()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};
