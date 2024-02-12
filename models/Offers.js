const mongoose = require("mongoose");
const schema = mongoose.Schema;

const offersSchema = new schema({
  name: String,
  price: Number,
});

const Offers = mongoose.model("Offer", offersSchema);

module.exports = Offers;
