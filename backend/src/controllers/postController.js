const postModel = require("../models/postModel");

const addPost = async (req, res) => {
  try {
    //   console.log("Received Request Body:", req.body);  //for check the data is inside the body or not
    const addedPost = await postModel.create(req.body);

    res.status(201).json({
      message: "Post Added Successfully",
    });
  } catch (error) {
    res.status(400).json({
      msg: "Post is not added!",
      //  error: error.message
    });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const allPost = await postModel.find();

    res.json({
      message: "Listed Businesses fetched successfully",
      data: allPost,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

module.exports = {
  addPost,
  getAllPosts,
};
