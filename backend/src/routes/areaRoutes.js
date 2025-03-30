const routes = require("express").Router();
const areaController = require("../controllers/areaController");

routes.post("/addarea", areaController.addArea);
routes.get("/getarea", areaController.getAllAreas);
routes.get("/getareabycity/:cityId",areaController.getAreaByCityId)

module.exports = routes;
