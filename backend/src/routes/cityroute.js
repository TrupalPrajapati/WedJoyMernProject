const routes = require("express").Router();
const cityController = require("../controllers/cityController");

routes.post("/addcity", cityController.addCity);
routes.get("/getcity", cityController.getAllCities);
routes.get("/getcitybystate/:stateId", cityController.getCityByStateId)

module.exports = routes;
