const UserModel = require("../models/user.model.js");
const bcryptjs = require("bcryptjs");
const express = require("express");
const {
  signupPage,
  signup,
  loginPage,
  login,
  getAllUsers,
  deleteUser,
  editUserPage,
  editUser,
  verifyToken,
  verifyOTP,
} = require("../controllers/user.controller.js");
const router = express.Router();

router.get("/signup", signupPage);

router.post("/signup", signup);

router.get("/login", loginPage);

router.post("/login", login);

router.get("/allUsers", getAllUsers);

router.post("/deleteUser/:id", deleteUser);

router.get("/editUser/:id", editUserPage);

router.post("/editUser/:id", verifyToken, editUser);
router.post("/verifyOTP", verifyOTP);

module.exports = router;
