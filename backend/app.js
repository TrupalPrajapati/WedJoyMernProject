const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors()); // *
app.use(express.json()); // to accept data as JSON

//userRoutes
const userRoutes = require("./src/routes/userRoutes");
app.use(userRoutes);

//eventRoutes
const eventRoutes = require("./src/routes/eventRoutes");
app.use("/event", eventRoutes);

//businessListingRoutes
const businessRoutes = require("./src/routes/businessListingRoutes");
app.use("/business", businessRoutes);

//PostRoutes
const PostRoutes = require("./src/routes/postRoutes");
app.use("/post", PostRoutes);

//EventRegistrationRoutes
const EventRegistrationRoutes = require("./src/routes/eventRegistrationRoutes");
app.use("/eventregister", EventRegistrationRoutes);

//PostRoutes
const reviewRoutes = require("./src/routes/reviewRoutes");
app.use("/review", reviewRoutes);

//stateRoutes
const stateRoutes = require("./src/routes/stateroute");
app.use("/state", stateRoutes);

//cityRoutes
const cityRoutes = require("./src/routes/cityroute");
app.use("/city", cityRoutes);

//areaRoutes
const areaRoutes = require("./src/routes/areaRoutes");
app.use("/area", areaRoutes);

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/wedjoy").then(() => {
  console.log("Database connected...");
});

// Server creation
const PORT = 3001;
app.listen(PORT, () => {
  console.log("Server started on port number", PORT);
});
