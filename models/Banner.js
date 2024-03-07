const mongoose = require("mongoose");
const schema = mongoose.Schema;

const BannerSchema = new schema({
  imageName: String,
  imagePath: String,
});

const Banner = mongoose.model("Banner", BannerSchema);

module.exports = Banner;
