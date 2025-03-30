const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const mailUtils = require("../utils/mainUtil");
const jwt = require("jsonwebtoken");
const secret = "secret";

//getAllUser
const getAllUsers = async (req, res) => {
  const users = await userModel.find();  //[{}]

  res.json({
    message: "Users fetched successfully",
    data: users,
  });
};

// //addUser
// const addUser = async (req, res) => {
//   const saveUser = await (await userModel.create(req.body)).populate("roleId");

//   res.json({
//     message: "User created...",
//     data: saveUser,
//   });
// };

//SignUp
// const signup = async (req, res) => {

//     try{
//         // console.log("Request Body:", req.body); 
//         const salt = bcrypt.genSaltSync(10);
//         const hashedPasswrod = bcrypt.hashSync(req.body.password,salt);  //saved password will be encrypted here
//         req.body.password = hashedPasswrod;   //plain pass should be replaced with hashed(encrypted) pass
      
//         const createdUser = await userModel.create(req.body);  
//         console.log(createdUser);
//          //
//         await mailUtils.sendingMail(createdUser.email, "Greet", "Welcome to the wedjoy");
//         res.status(200).json({ message: "User signed up successfully!" });
//     }catch(error){
//         return res.status(400).json({ msg: "Signup failed: All fields are required" });
//     }
// };

// SignUp
const signup = async (req, res) => {
  try {
      // Hash password before saving
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);
      req.body.password = hashedPassword;

      // Create user in the database
      const createdUser = await userModel.create(req.body);
      console.log("User Created:", createdUser);

      // Send welcome email
      try {
          await mailUtils.sendingMail(createdUser.email, "Greet", "Welcome to the WedJoy");
      } catch (emailError) {
          // console.error("Email sending failed:", emailError);
          // Proceed without failing the signup process
      }

      res.status(200).json({ message: "User signed up successfully!" });

  } catch (error) {
      console.error("Signup Error:", error); // Logs full error in backend
      return res.status(400).json({ msg: "Signup failed: " + error.message });
  }
};



//login
const login = async (req, res)=>{

//   const role = req.body.id;  
  const email = req.body.email;         // user entered value in login form
  const password = req.body.password;   // user entered value in login form
  
  console.log("Email:", email);
  console.log(password);
  
// console.log("Role:", role);

  const foundUserFromMail = await userModel.findOne({email:email});
  console.log(foundUserFromMail);


  if(foundUserFromMail != null){
    //
    const isActive = bcrypt.compareSync(password,foundUserFromMail.password);
    if(isActive == true){

      res.status(200).json({
        message:"Login successfully",
        data: foundUserFromMail
      })
    }
    else{
      res.status(401).json({
        message:"Login failed (invalid password)",
      })
    }
  }
  else{
    res.status(404).json({
      message:"User is not found"
    })
  }
}

//deleteUser
const deleteUser = async (req, res) => {
  const deletedUser = await userModel.findByIdAndDelete(req.params.id);

  res.json({
    message: "User deleted successfully..",
    data: deletedUser,
  });
};

//getUserById
const getUserById = async (req, res) => {
  const foundUser = await userModel.findById(req.params.id);
  res.json({
    message: "user fatched..",
    data: foundUser,
  });
};

//forgot password
const forgotpassword = async(req,res)=>{
  const email = req.body.email;
  const founduser = await userModel.findOne({ email: email});

  if(founduser){
    const token = jwt.sign(founduser.toObject(),secret);
    console.log(token);
    
    const url = `http://localhost:5173/resetpassword/${token}`;
    const mailcontent = `<html>
                           <a href ="${url}">rest password</a>
                        </html>`;

    await mailUtils.sendingMail(founduser.email,'reset password',mailcontent);

  }
  else{
    res.json({
      msg:"User not found"
    })
  }
}

const resetpassword = async (req, res) => {
  const token = req.body.token; //decode --> email | id
  const newPassword = req.body.password;

  const userFromToken = jwt.verify(token, secret);
  //object -->email,id..
  //password encrypt...
  const salt = bcrypt.genSaltSync(10);
  const hashedPasseord = bcrypt.hashSync(newPassword,salt);

  const updatedUser = await userModel.findByIdAndUpdate(userFromToken._id, {
    password: hashedPasseord,
  });
  res.json({
    message: "password updated successfully..",
  });
};

//exports
module.exports = {
  getAllUsers,
  signup,
  deleteUser,
  getUserById,
  login,
  forgotpassword,
  resetpassword
};
