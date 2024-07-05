const express = require("express");
const { CategoryType, Subcategory } = require("../models/categorytype.model");
const multer = require("multer");
const mongoose = require("mongoose");

const router = express.Router();

// Set up multer for file uploads
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
  limits: { fileSize: 1024 * 1024 * 10 } // 10MB file size limit
});

// Route to create a new category type
router.post("/", upload.single('file'), async (req, res) => {
  try {
    const { name ,  } = req.body;
    const image = req.file.filename;

    const existingCategory = await CategoryType.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ success: false, error: "Category with this name already exists" });
        }

    const savedCategory = await CategoryType.create({
      name: name,
      image: `http://localhost:4500/images/categoryImage/${image}`,
      categoryId: new mongoose.Types.ObjectId() // Generate a new ObjectId if needed
    });

    console.log("savedCategory:", savedCategory);
    res.status(200).json({ savedCategory, success: true, error: false });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Route to get all category types
router.get("/", async (req, res) => {
  try {
    const categories = await CategoryType.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Route to add a subcategory to a category type
router.post("/:categoryId/subcategory", upload.single('image'), async (req, res) => {
    try {
      const { categoryId } = req.params;
      const { name, price, availableStock, description } = req.body;
      const image = req.file.filename;
  
      // Validate that all required fields are present
      if (!name || !price || !availableStock || !description || !image) {
        return res.status(400).json({ success: false, error: "All fields (name, price, availableStock, description, image) are required" });
      }
  
      const categoryIdObj = new mongoose.Types.ObjectId(categoryId);
  
      const categoryType = await CategoryType.findById(categoryIdObj);
      if (!categoryType) {
        return res.status(404).json({ success: false, error: "Category type not found" });
      }
  
      const subcategory = new Subcategory({
        name,
        image: `http://localhost:4500/images/categoryImage/${image}`, // Assuming image path is correct
        price,
        availableStock,
        description,
      });
  
      await subcategory.save();
      categoryType.subcategories.push(subcategory);
      await categoryType.save();
  
      res.status(200).json({ categoryType, success: true, error: false });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

// Route to get a specific category type by ID
router.get("/:categoryId", async (req, res) => {
  try {
    const { categoryId } = req.params;
    const categoryType = await CategoryType.findById(categoryId);
    if (!categoryType) {
      return res.status(404).json({ success: false, error: "Category type not found" });
    }

    res.status(200).json({ categoryType, success: true, error: false });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
