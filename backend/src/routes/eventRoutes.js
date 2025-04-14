const routes = require("express").Router();
const eventController = require("../controllers/eventController");

// routes.post('/addevent',eventController.addEvents);
routes.post('/addevent',eventController.getAllEVentsByuserId);
routes.post('/addeventwithfile',eventController.addEventWithFile);
routes.get('/getevents',eventController.getAllEVents);
routes.get('/getallapprovedevents',eventController.getApprovedEvents);
// routes.get('/getallapprovedevents',eventController.getAllApprovedEventsWithCounts);
routes.get('/geteventsbyuserid/:userId', eventController.getAllEVentsByuserId);
routes.get("/geteventbyid/:id", eventController.getEventByEventId);
routes.get("/geteventbyidwithcount/:id", eventController.getEventByIdWithCount);

module.exports = routes; 