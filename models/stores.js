// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
  name: {type: String},
  location: {type: String}
});

module.exports = mongoose.model("Stores", StoreSchema);