const routes = require("express").Router()
const roleController= require("../controllers/RoleController")
// routes.get("/roles", (req,res)=>{})

 routes.get("/roles",roleController.getAllRoles)
 routes.post("/roles",roleController.addRole)
 routes.delete("/role/:id",roleController.deleteRole)
 routes.get("/role/:id",roleController.getRoleById)
 
 module.exports = routes