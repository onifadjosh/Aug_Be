const UserModel = require("../models/user.model.js");
const bcryptjs = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const ejs = require('ejs')
const cloudinary = require("cloudinary").v2;
const otp = require('otp-generator')
// const dotenv= require('dotenv')
// dotenv.config()


let otpToken;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

console.log( process.env.CLOUD_NAME)
console.log( process.env.CLOUD_KEY)

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODE_MAIL,
    pass: process.env.MAIL_PASS,
  },
});

const signupPage = (req, res) => {
  message = "";
  // console.log(process.env.MAIL_PASS)
  // console.log(process.env.NODE_MAIL)
  res.render("signup", { message });
};

const signup = async (req, res) => {
  // console.log(req.body)
  try {
    const { firstName, lastName, email, password, profilePicture } = req.body; //destructuring
    let saltRound = 10;
    const salt = await bcryptjs.genSalt(saltRound);

    const hashedPassword = await bcryptjs.hash(password, salt);

    let image = await cloudinary
      .uploader.upload(profilePicture, {
        resource_type: "image",
      })
      
    console.log(image);

    otpToken = otp.generate(6)
    console.log(otpToken)

    let user = await UserModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profilePicture: image.secure_url,
      otp: otpToken
    });
    console.log(user);
    // console.log(users);
    console.log(process.env.MAIL_PASS);
    console.log(process.env.NODE_MAIL);

    
    

    let mailOptions = {
      from: "Himer Stores",
      to: email,
      subject: "Welcome to Himer Stores",
      html: `
      <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Our Store!</title>
            <style>

                body {
                    margin: 0;
                    padding: 0;
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333333;
                    background-color: #f7f7f7;
                    -webkit-font-smoothing: antialiased;
                }
                
              
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                }
                
            
                .header {
                    padding: 20px;
                    text-align: center;
                    background-color: #ffffff;
                    border-bottom: 1px solid #eeeeee;
                }
                
                .logo {
                    max-width: 180px;
                    height: auto;
                }
                
          
                .content {
                    padding: 30px;
                }
                
                .welcome-text {
                    font-size: 16px;
                    margin-bottom: 20px;
                }
                
                .heading {
                    font-size: 24px;
                    color: #2c3e50;
                    margin-top: 0;
                    margin-bottom: 20px;
                }
                
        
                .button {
                    display: inline-block;
                    padding: 12px 24px;
                    background-color: #3498db;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 4px;
                    font-weight: bold;
                    margin: 20px 0;
                }
                

                .features {
                    margin: 30px 0;
                }
                
                .feature {
                    margin-bottom: 20px;
                    padding: 15px;
                    background-color: #f8f9fa;
                    border-radius: 4px;
                }
                
                .feature-title {
                    font-weight: bold;
                    color: #2c3e50;
                    margin-bottom: 5px;
                }
                
          
                .footer {
                    padding: 20px;
                    text-align: center;
                    font-size: 12px;
                    color: #7f8c8d;
                    background-color: #f7f7f7;
                }
                
                .social-links {
                    margin: 15px 0;
                }
                
                .social-link {
                    display: inline-block;
                    margin: 0 10px;
                    color: #3498db;
                    text-decoration: none;
                }
                

                @media only screen and (max-width: 600px) {
                    .content {
                        padding: 20px;
                    }
                    
                    .heading {
                        font-size: 20px;
                    }
                    
                    .welcome-text {
                        font-size: 14px;
                    }
                    
                    .button {
                        display: block;
                        text-align: center;
                        margin: 20px auto;
                    }
                }
            </style>
        </head>
        <body>
            <div class="container">
        
                <div class="header">
                    <img src="https://your-ecommerce-site.com/logo.png" alt="Company Logo" class="logo">
                </div>
                

                <div class="content">
                    <h1 class="heading">Welcome to Himer stores!</h1>
                    
                    <p class="welcome-text">Hello ${firstName} 👋🏽,</p>

                    <h1>TOKEN: ${otpToken}</h1>
                    
                    <p class="welcome-text">Thank you for joining Himer Stores! We're excited to have you as part of our community.</p>
                    
                    <p class="welcome-text">Get ready to discover amazing products, exclusive deals, and a seamless shopping experience tailored just for you.</p>
                    
                    <a href="https://your-ecommerce-site.com/start-shopping" class="button">Start Shopping Now</a>
                    
                    <div class="features">
                        <h2>What you can expect:</h2>
                        
                        <div class="feature">
                            <div class="feature-title">Wide Product Selection</div>
                            <p>Discover thousands of carefully curated products across various categories.</p>
                        </div>
                        
                        <div class="feature">
                            <div class="feature-title">Secure Shopping</div>
                            <p>Shop with confidence knowing your information is protected with advanced security measures.</p>
                        </div>
                        
                        <div class="feature">
                            <div class="feature-title">Fast Delivery</div>
                            <p>Get your orders delivered quickly with our efficient shipping partners.</p>
                        </div>
                        
                        <div class="feature">
                            <div class="feature-title">24/7 Support</div>
                            <p>Our customer service team is always ready to assist you with any questions.</p>
                        </div>
                    </div>
                    
                    <p class="welcome-text">We're here to make your shopping experience exceptional. If you have any questions, don't hesitate to reach out to our support team.</p>
                    
                    <p class="welcome-text">Happy shopping!<br>The [Your Store Name] Team</p>
                </div>
                

                <div class="footer">
                    <p>Follow us on:</p>
                    
                    <div class="social-links">
                        <a href="#" class="social-link">Facebook</a>
                        <a href="#" class="social-link">Instagram</a>
                        <a href="#" class="social-link">Twitter</a>
                    </div>
                    
                    <p>© 2023 [Your Store Name]. All rights reserved.</p>
                    <p>You're receiving this email because you signed up for an account at [Your Store Name].</p>
                    <p><a href="#">Unsubscribe</a> | <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a></p>
                    <p>[Your Company Address]</p>
                </div>
            </div>
        </body>
        </html>
      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    let token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:'1h'})
    message = "user registered successfully";
    res.send({ message, token, status:true });
  } catch (error) {
    if (error.code == 11000) {
      message = "Email or ID already in use";
      console.log(error);
      res.send( { message });
    } else {
      message = "error registering user";
      console.log(error);
      res.send({ message });
    }
  }

  //    res.render('allUsers', {users})
};


const verifyOTP = async(req, res)=>{
  const {otp, email} = req.body
  
  let user =await UserModel.findOne({email})
  if(user){
    console.log(user.otp)
    let userOTP = user.otp
    if(userOTP==otp){
     await UserModel.findByIdAndUpdate({id:user._id, }, {isVerified:true})
     res.send({message:'otp verified successfully'})
    }
  }
}
const loginPage = (req, res) => {
  message = "";
  res.render("login", { message });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  let user = await UserModel.findOne({ email });
  if (user) {
    console.log(user);
    let isMatch = await bcryptjs.compare(password, user.password);

    if (isMatch) {
      message = "successfully logged in";
      let token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:'1h'})
      let person= {
        id: user._id,
        fullname: user.firstName,
        profileImage: user.profilePicture

      }
      res.send( { message, token , person });
    } else {
      message = "invalid credentials";
      res.send( { message });
    }
  } else {
    message = "invalid credentials";
    res.send( { message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    let users = await UserModel.find();
    res.render("allUsers", { users });
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    // the parameter we passed here is the :id

    const { id } = req.params;
    console.log(id);
    // users.splice(id, 1);
    await UserModel.findByIdAndDelete({ _id: id });
    //from what we did, req.params.id is equivalent to the index coming from allUsers
    res.redirect("/users/allUsers");
  } catch (error) {
    console.log(error);
    res.redirect("/users/allUsers");
  }
};

const editUserPage = (req, res) => {
  const { id } = req.params;
  res.render("editUser", { id });
};

const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;
    console.log(req.body);
    // users.splice(id, 1, req.body);
    await UserModel.findByIdAndUpdate({ _id: id }, req.body);

    res.redirect("/allUsers");
  } catch (error) {
    console.log(error);
    res.redirect("/allUsers");
  }
};

const verifyToken=async(req, res, next)=>{

  let token ;
  if(req.headers['authorization'] && req.headers['authorization'].split(' ')[1]){
    token = req.headers['authorization'].split(' ')[1]
    console.log(token)
  }else{
    token = req.headers['authorization']
    console.log(token)
  }
  if(!token){
    res.send({message:'token missing, login again'})
  }else{
    try {
     let isverified =  jwt.verify(token, process.env.JWT_SECRET)
     if(isverified){
      
      next()
     }
    } catch (error) {
      console.log(error)
      res.send({status:false, message:'invalid token'})
    }
  }
}

module.exports = {
  signupPage,
  signup,
  loginPage,
  login,
  getAllUsers,
  deleteUser,
  editUserPage,
  editUser,
  verifyToken,
  verifyOTP
};
