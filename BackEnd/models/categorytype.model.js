const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubcategorySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    availableStock: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    
});

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category', // Self-referencing the Category model if necessary
        required: true,
    },
    subcategories: [SubcategorySchema]
});

const CategoryType = mongoose.model('CategoryType', CategorySchema);
const Subcategory = mongoose.model('Subcategory', SubcategorySchema);

module.exports = { CategoryType, Subcategory };
