const express = require("express");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const Category = require("../models/category.model");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("Saving file to public/images directory");
    cb(null, "backend/public/images/categoryImage");
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + "-" + file.originalname;
    console.log("Generated filename:", filename);
    cb(null, filename);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 }
});

router.post("/", verifyTokenAndAdmin, upload.single('file'), async (req, res) => {
  try {
    const categoryName = req.body.categoryName;
    const image = req.file.filename;
console.log("category");
    // const newCategory = new Category({
    //   categoryName: categoryName,
    //   image: `http://localhost:4500/images/categoryImage/${image}`
    // });

    const savedCategory = await Category.create({
      categoryName: categoryName,
      image: `http://localhost:4500/images/categoryImage/${image}`
    });
    console.log("savedCategory----------", savedCategory);
    res.status(200).json({ savedCategory, success: true, error: false });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
});


module.exports = router;
