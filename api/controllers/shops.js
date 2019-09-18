const mongoose = require('mongoose');

const Shop = require('../models/shop');

exports.get_shop = (req, res, next) => {
    Shop.find()
        .select("name address image_url owner products")
        .populate("owner")
        .populate("products")
        .exec()
        .then(shop => {
            res.status(200).json(shop);
        })
        .catch(error => {
            res.status(500).json({ error: error });
        })
};

exports.add_shop = (req, res, next) => {
    const shop = new Shop({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        address: req.body.address,
        image_url: req.file.path,
        owner: req.body.owner,
        products: req.body.products
    });

    shop.save()
        .then(doc => {
            res.status(201).json(doc);
        })
        .catch(error => {
            res.status(500).json({ error: error })
        });

};