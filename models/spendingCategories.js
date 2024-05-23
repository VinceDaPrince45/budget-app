// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const SpendingCategoriesSchema = new Schema({
    name: {type:string, required:true},
});

SpendingCategoriesSchema.virtual("url").get(function () {
    return `/categories/spendingcategory/${this._id}`;
});

module.exports = mongoose.model("SpendingCategories",SpendingCategoriesSchema);