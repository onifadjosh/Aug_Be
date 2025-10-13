const mongoose = require("mongoose");

let ProductSchema = mongoose.Schema({
  prodName: { required: true, type: String },
  prodPrice: { required: true, type: String },
  prodImage: { required: true, type: String },
  prodDesc: { type: String, default: false },
});

let ProductModel = mongoose.model("product", ProductSchema);

module.exports = ProductModel;
