const express = require('express');
const { addProductPage, addProduct, getProducts } = require('../controllers/product.controller');
const { verifyToken } = require('../controllers/user.controller');
const router = express.Router()
router.get("/addProduct", addProductPage);
  
  router.post("/addProduct",verifyToken, addProduct);
  router.get("/getProducts",verifyToken,  getProducts)


  module.exports= router;
