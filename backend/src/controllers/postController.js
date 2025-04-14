const Post = require('../models/postModel');
const User = require('../models/userModel');
const { uploadFileToCloudinary } = require('../utils/cloudinaryUtil');

// Modified createPost controller
exports.createPost = async (req, res) => {
  try {
    const { content, userId } = req.body;
    let mediaUrl = null;
    let mediaType = null;

    // Handle file upload if exists
    if (req.file) {
      const result = await uploadFileToCloudinary(req.file);
      mediaUrl = result.secure_url;
      mediaType = req.file.mimetype.startsWith('image') ? 'image' : 'video';
    }

    const post = await Post.create({ 
      userId,
      content,
      media: mediaUrl,
      mediaType
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create Post - without user validation
// exports.createPost = async (req, res) => {
//   try {
//     const { content, userId, userName } = req.body;

//     // Basic validation
//     if (!content || !userId) {
//       return res.status(400).json({ error: "Content and userId are required" });
//     }

//     const post = await Post.create({ 
//       userId,
//       userName: userName || 'Anonymous', // Fallback if userName not provided
//       content 
//     });
    
//     res.status(201).json(post);
//   } catch (error) {
//     res.status(400).json({ 
//       error: "Failed to create post",
//       details: error.message 
//     });
//   }
// };

// Modified createPost controller
exports.createPost = async (req, res) => {
  try {
    const { content, userId } = req.body;
    let mediaUrl = null;
    let mediaType = null;

    // Handle file upload if exists
    if (req.file) {
      const result = await uploadFileToCloudinary(req.file);
      mediaUrl = result.secure_url;
      mediaType = req.file.mimetype.startsWith('image') ? 'image' : 'video';
    }

    const post = await Post.create({ 
      userId,
      content,
      media: mediaUrl,
      mediaType
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).populate('userId', 'name').populate('likes', 'name').populate('comments.userId', 'name'); // Populate commenters' names;
    console.log("Here:",JSON.stringify(posts[0]?.comments, null, 2)); // Log sample comments
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Like Post
// exports.likePost = async (req, res) => {
//   try {
//     const { postId, userId } = req.body;
//     const post = await Post.findById(postId);
    
//     if (!post.likes.includes(userId)) {
//       post.likes.push(userId);
//       await post.save();
//     }
    
//     res.status(200).json(post);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// Like Post
exports.likePost = async (req, res) => {
  try {
    const { postId, userId } = req.body;
    
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if already liked
    const alreadyLiked = post.likes.some(like => 
      like.toString() === userId.toString()
    );
    
    if (alreadyLiked) {
      return res.status(400).json({ error: "Post already liked" });
    }

    post.likes.push(userId);
    await post.save();
    
    // Populate user data before sending response
    const populatedPost = await Post.findById(post._id)
      .populate('userId', 'name')
      .populate('likes', 'name');
    
    res.status(200).json(populatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Unlike Post
exports.unlikePost = async (req, res) => {
  try {
    const { postId, userId } = req.body;
    
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if user has liked the post
    const likeIndex = post.likes.findIndex(like => 
      like.toString() === userId.toString()
    );
    
    if (likeIndex === -1) {
      return res.status(400).json({ error: "User hasn't liked this post" });
    }

    post.likes.splice(likeIndex, 1);
    await post.save();
    
    // Populate user data before sending response
    const populatedPost = await Post.findById(post._id)
      .populate('userId', 'name')
      .populate('likes', 'name');
    
    res.status(200).json(populatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add this new unlike controller
// exports.unlikePost = async (req, res) => {
//     try {
//       const { postId, userId } = req.body;

//       // Validate required fields
//       if (!postId || !userId) {
//         return res.status(400).json({ error: "postId and userId are required" });
//       }

//       const post = await Post.findById(postId);

//       // Check if post exists
//       if (!post) {
//         return res.status(404).json({ error: "Post not found" });
//       }
      
//       post.likes = post.likes.filter(id => id.toString() !== userId.toString());
//       await post.save();
      
//       res.status(200).json({
//         success: true,
//         message: "Post unliked successfully",
//         post
//       });
//     } catch (error) {
//       res.status(400).json({ 
//         error: "Internal server error",
//         details: error.message 
//        });
//     }
//   };

// Add Comment
exports.addComment = async (req, res) => {
  try {
    const { postId, userId, text } = req.body;

    // Basic validation
    if (!postId || !userId || !text) {
      return res.status(400).json({ 
        error: "Missing Fields"
      });
    }

    // First verify the user exists
    const user = await User.findById(userId).select('name');
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const post = await Post.findByIdAndUpdate(postId,{
      $push: { 
          comments: { 
            userId,  // Store user reference
            userName: user.name,
            text 
          } 
        } 
      },
      {new: true}
    ).populate('userId', 'name'); // Populate post author

    
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
       
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};