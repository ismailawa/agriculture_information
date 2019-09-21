const mongoose = require('mongoose');

const Class = require("../models/class");

exports.get_classes = (req, res, next) => {
    Class.find()
        .populate("subcategory")
        .exec()
        .then((Class) => {
            res.status(200).json(Class)
        })
        .catch((error) => {
            res.status(500).json({ error: error })
        });
};


exports.add_class = (req, res, next) => {
    const newClass = new Class({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        tag: req.body.tag,
        subcategory: req.body.subcategory
    });

    newClass.save()
        .then((Class) => {
            res.status(201).json(Class)
        })
        .catch((error) => {
            res.status(500).json({ error: error });
        });
};