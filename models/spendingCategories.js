// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const SpendingCategoriesSchema = new Schema({
    name: {type:string, required:true},
});

module.exports = mongoose.model("SpendingCategories",SpendingCategoriesSchema);