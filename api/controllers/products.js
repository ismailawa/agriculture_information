const mongoose = require('mongoose');

const Product = require('../models/product');
const Subcategory = require('../models/sub-category');
const Class = require('../models/class')

exports.get_products = (req, res, next) => {
    Product.find()
        .select("name type prize description image_url video available class user")
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
        class: req.body.class
    });

    product.save()
        .then((product) => {
            res.status(201).json(product);
        })
        .catch((error) => {
            res.status(500).json({ error: error })
        });
}

exports.get_products_by_category = (req, res, next) => {
    const categoryId = req.params.categoryId;
    Subcategory.find()
        .where({ category: categoryId })
        .exec()
        .then((Cats) => {
            const subCatId = []
            Cats.forEach((Cat) => {
                const subCatDoc = { subcategory: Cat._id };
                subCatId.push(subCatDoc)
            });
            if (subCatId.length > 0) {
                Class.find()
                    .where({ $or: subCatId })
                    .exec()
                    .then((Classes) => {
                        const ClassesId = [];
                        Classes.forEach((Class) => {
                            const ClassDoc = { class: Class._id };
                            ClassesId.push(ClassDoc)
                        });

                        if (ClassesId.length > 0) {
                            Product.find()
                                .where({ $or: ClassesId })
                                .exec()
                                .then((products) => {
                                    res.status(200).json(products);
                                }).catch((error) => {
                                    res.status(500).json({ error: error })
                                });
                        } else {
                            return res.status(404).json({ message: "Class not found" });
                        }

                    }).catch((error) => {
                        res.status(500).json({ error: error });
                    });

            } else {
                return res.status(404).json({ message: "Category not found " });
            }
        }).catch((error) => {
            res.status(500).json({ error: error });
        });

}