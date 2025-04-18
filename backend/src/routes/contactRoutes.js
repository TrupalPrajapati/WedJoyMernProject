const express = require("express");
const router = express.Router();
const { postContactMessage } = require("../controllers/contactController");

router.post("/contactUs", postContactMessage);

module.exports = router;
