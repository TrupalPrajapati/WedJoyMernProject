const express = require('express');
const routes = express.Router();
const upload = require('../middleware/multer'); // You'll need multer config
const postController = require('../controllers/postController');

// routes.post('/', postController.createPost);
routes.post('/', upload.single('media'), postController.createPost);
routes.get('/', postController.getAllPosts);
routes.post('/like', postController.likePost);
routes.post('/unlike', postController.unlikePost);
routes.post('/comment', postController.addComment);

module.exports = routes;