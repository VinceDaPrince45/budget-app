// Require Mongoose
const mongoose = require("mongoose");
const { DateTime } = require("luxon");

// Define a schema
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
  item_name: {type: String, required: true},
  date_bought: {type: Date},
  item_description: {type: String},
  store_bought: {type: Schema.Types.ObjectId, ref:"Stores"},
  categories: [{type: Schema.Types.ObjectId, ref:"SpendingCategories"}],
  price: {type: Number, required: true}
});

ExpenseSchema.virtual("url").get(function () {
  return `/catalog/expense/${this._id}`;
});

ExpenseSchema.virtual("date_bought_formatted").get(function () {
  return DateTime.fromJSDate(this.date_bought).toLocaleString(DateTime.DATE_MED);
})

module.exports = mongoose.model("Expenses", ExpenseSchema);