const routes = require("express").Router();
const postController = require("../controllers/postController");

routes.post('/addpost', postController.addPost);
routes.get('/getposts', postController.getAllPosts);

module.exports = routes; 