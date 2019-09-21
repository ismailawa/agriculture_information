const express = require('express');
const router = express.Router();

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/");
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const upload = multer({ storage: storage })
const controller = require("../controllers/products");

router.route("/")
    .get(controller.get_products)
    .post(upload.single('image'), controller.add_product);
router.route("/:categoryId")
    .get(controller.get_products_by_category);

module.exports = router;