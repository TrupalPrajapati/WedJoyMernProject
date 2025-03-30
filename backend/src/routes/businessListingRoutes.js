const routes = require("express").Router();
const businessListingController = require("../controllers/businessListingController");

routes.post('/addbusiness', businessListingController.addBusiness);
routes.get('/getbusinesses', businessListingController.getAllBusinesses);
routes.get("/getbusinessesbyuserid/:userId", businessListingController.getBusinessesByUserId);
routes.get("/getbusinessesdetailsbybusinessid/:_id", businessListingController.getBusinessesDetailsByBusinessId);

module.exports = routes; 