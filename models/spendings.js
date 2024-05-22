// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
  item_name: {type: String, required: true},
  date_bought: {type: Date},
  item_description: {type: String},
  categories: [{type: Schema.Types.ObjectId, ref:"SpendingCategories"}],
  price: {type: Number}
})

module.exports = mongoose.model("Expenses", ExpenseSchema);