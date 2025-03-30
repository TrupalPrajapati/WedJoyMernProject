const routes = require("express").Router();
const eventRegistrationController = require("../controllers/EventRegistrationController");

routes.post("/register", eventRegistrationController.registerForEvent);
routes.get("/registrations/:userId", eventRegistrationController.getAllRegistrationsbyUserId);
routes.delete("/cancel/:userId/:eventId", eventRegistrationController.cancelRegistration);
routes.get('/getallapprovedevents',eventRegistrationController.getAllApprovedEvents);


module.exports = routes; 