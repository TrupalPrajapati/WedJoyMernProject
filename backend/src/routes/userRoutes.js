const routes = require("express").Router()

const userController = require("../controllers/userController")

routes.get("/users", userController.getAllUsers)
// routes.post("/user", userController.addUser)
routes.post("/signup", userController.signup)
routes.post("/login", userController.login)
routes.delete("/user/:id", userController.deleteUser)
routes.get("/user/:id", userController.getUserById)
routes.post("/user/forgotpassword",userController.forgotpassword);
routes.post("/user/resetpassword",userController.resetpassword);

module.exports = routes; 