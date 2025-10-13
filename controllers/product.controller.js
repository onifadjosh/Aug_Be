const express = require('express')
const ProductModel = require('../models/product.model.js')

const addProductPage = (req, res) => {
  message = "";
  res.render("addProduct", { message });
};

const addProduct = async (req, res) => {
  // console.log(req.body)
  try {
    const { prodName, prodPrice, prodImage, prodDesc } = req.body; //destructuring

    let product = await ProductModel.create(req.body);
    console.log(product);

    message = "product added";
    res.render("addProduct", { message });
  } catch (error) {
    message = "error adding product";
    res.render("addProduct", { message });
  }
};

const getProducts = async(req, res)=>{
  try {
    let products = await ProductModel.find()
    res.send({status:true, products, message:'products fetched successfully'})
  } catch (error) {
    res.send({status:false, message:'error fetching products'}) 
  }
}

module.exports = {
  addProductPage,
  addProduct,
  getProducts
};
