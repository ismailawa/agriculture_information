const mongoose = require('mongoose');

const Product = require('../models/product');

exports.get_products = (req, res, next) => {
    Product.find()
        .select("name type prize description image_url video available")
        .populate("video", "title description video_url")
        .exec()
        .then((product) => {
            res.status(200).json(product)
        })
        .catch((error) => {
            res.status(500).json({ error: error })
        });
}

exports.add_product = (req, res, next) => {
    const product = new Product({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        type: req.body.type,
        description: req.body.description,
        image_url: req.file.path,
        prize: req.body.prize,
        video: req.body.video,
        user: req.body.user,
    });

    product.save()
        .then((product) => {
            res.status(201).json(product);
        })
        .catch((error) => {
            res.status(500).json({ error: error })
        });
}