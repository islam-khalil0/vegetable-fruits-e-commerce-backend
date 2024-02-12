const mongoose = require("mongoose");
const schema = mongoose.Schema;

const vegetableSchema = new schema({
  name: String,
  price: Number,
});

const Vegetable = mongoose.model("Vegetable", vegetableSchema);

module.exports = Vegetable;
