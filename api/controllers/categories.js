const mongoose = require('mongoose');

const Category = require("../models/category");

exports.get_categories = (req, res, next) => {
    Category.find()
        .exec()
        .then((category) => {
            res.status(200).json(category);
        })
        .catch((error) => {
            res.status(500).json({ error: error })
        });

};

exports.add_category = (req, res, next) => {
    const category = new Category({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        tag: req.body.tag
    });

    category.save()
        .then((category) => {
            res.status(201).json(category);
        })
        .catch((error) => {
            res.status(500).json({ error: error });
        });
};