import express from "express";
// Importing the router for room-related routes from './room.js'
import roomRoute from "./room.js";
// Creating an instance of an Express router
let indexRouter = express.Router();
// Mounting the room-related routes under the '/hallbooking' path
indexRouter.use("/hallbooking", roomRoute);
// Exporting the router to be used by other parts of the application
export default indexRouter;
