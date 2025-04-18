const express = require('express');
const routes = require("express").Router();
const businessListingController = require("../controllers/businessListingController");

routes.post('/addbusiness', businessListingController.addBusiness);
routes.post('/addbusinesswithimage', businessListingController.addBusinessListingWithImage);
routes.get('/getbusinesses', businessListingController.getAllBusinesses);
routes.get("/getbusinessesbyuserid/:userId", businessListingController.getBusinessesByUserId);
routes.get("/getbusinessesdetailsbybusinessid/:_id", businessListingController.getBusinessesDetailsByBusinessId);
routes.delete("/:id", businessListingController.deleteBusiness);
routes.put('/:id/images', businessListingController.updateBusinessImages);

module.exports = routes; 