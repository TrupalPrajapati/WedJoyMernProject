const routes = require("express").Router();
const reviewController = require("../controllers/reviewController");

routes.post("/addreview", reviewController.addreview);
routes.get("/event-reviews/:eventId", reviewController.getAllReview);
// routes.get("/reviewbyuser/:userid", reviewController.getReviewByUserId);

module.exports = routes; 