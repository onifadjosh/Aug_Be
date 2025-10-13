const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const dotenv = require('dotenv')
const cors = require('cors')//3
app.use(cors())//2
dotenv.config()
const nodemailer =require('nodemailer')
const userRoute = require("./routes/user.routes.js");
const productRoute= require("./routes/product.routes.js")
const path = require("path");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true })); //body parser from express js
app.use(express.json())//1
app.use(express.static(__dirname + "/public"));
app.use("/users", userRoute);
app.use("/products", productRoute)
const ProductModel = require("./models/product.model.js");
const UserModel = require("./models/user.model.js");
let URI = process.env.DATABASE_URI;
mongoose
  .connect(URI)
  .then(() => {
    console.log("database connected sucessfully");
  })
  .catch((err) => {
    console.log(err);
  });

let message;
let users = [];
app.get("/", (req, res) => {
  res.send("Application working perfectly");
});

app.get("/getImage", (req, res) => {
  let dir = __dirname;
  console.log(dir);
  res.sendFile(dir + "/public/gloria.png");
});

app.get("/home", (req, res) => {
  let gender = "man";
  res.render("index", { gender });
});



let port = 5005;
app.listen(port, (err) => {
  if (err) {
    console.log("server cannot start at this time");
  } else {
    console.log(`server started on port ${port}`);
  }
});
