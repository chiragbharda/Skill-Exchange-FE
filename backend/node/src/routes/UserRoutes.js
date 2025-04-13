
const routes = require("express").Router()

const userController = require("../controllers/UserController")
// routes.post("/user",userController.addUser)
routes.post("/user", userController.signup)
// routes.get("/user",userController.addUser)
const upload = require("../Middleware/Uplode"); 

routes.get("/users", userController.getAllUsers)
routes.get("/user/:id", userController.getUserById)
// routes.get("/search/:text", userController.SearchSkill)
routes.delete("/user/:id", userController.deleteUserById)
routes.post("/user/login", userController.loginUser)
routes.put("/user/update:id", userController.updateUserProfile)
routes.post("/user/forgotpassword", userController.forgotPassword)
routes.post("/user/resetpassword", userController.resetpassword)
routes.post("/users/:id/warning", userController.sendWarning);
routes.put("/user/update", upload.single("profile_image"), userController.updateUserProfile);



module.exports = routes