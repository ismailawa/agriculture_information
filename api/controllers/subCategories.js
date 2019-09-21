const mongoose = require('mongoose');

const Subcategory = require("../models/sub-category");

exports.get_subCategories = (req, res, next) => {
    Subcategory.find()
        .populate("category")
        .exec()
        .then((subcategories) => {
            res.status(200).json(subcategories);
        })
        .catch((error) => {
            res.status(500).json({ error: error })
        });
};


exports.add_subCategories = (req, res, next) => {

    const subcategory = new Subcategory({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        tag: req.body.tag,
        category: req.body.category
    });

    subcategory.save()
        .then((subcategory) => {
            res.status(201).json(subcategory);
        })
        .catch((error) => {
            res.status(500).json({ error: error });
        })


};

