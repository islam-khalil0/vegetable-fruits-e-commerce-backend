const mongoose = require("mongoose");
const schema = mongoose.Schema;

const FruitsSchema = new schema({
  name: String,
  price: Number,
  imageName: String,
  imagePath: String,
});

const Fruits = mongoose.model("Fruits", FruitsSchema);

module.exports = Fruits;
