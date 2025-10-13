const mongoose = require('mongoose')

let UserSchema = mongoose.Schema({
  firstName: { required: true, type: String },
  lastName: { required: true, type: String },
  email: { required: true, type: String, unique: true },
  password: { required: true, type: String },
  profilePicture: {type:String},
  otp: {type:String, default: '000000' },
  isVerified:{ type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
});

let UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;