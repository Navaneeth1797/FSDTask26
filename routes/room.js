import express from "express";
// Importing the common controller which contains functions to handle various room-related operations
import commonController from "../controllers/common.js";
// Creating an instance of an Express router to handle room-related routes
let roomRouter = express.Router();
// GET request to fetch all bookings and rooms
roomRouter.get("/", commonController.getAllBookingsAndRooms);
// POST request to create a new room
roomRouter.post("/create-room", commonController.createRoom);
// POST request to book a room
roomRouter.post("/book-room", commonController.bookRoom);
// GET request to get all customers with their booked data
roomRouter.get(
  "/customer-details",
  commonController.getAllCustomersWithBookedData
);
// GET request to get the booking history of a specific customer
roomRouter.get("/customer-history", commonController.getCustomerRoomHistory);
 // GET request to get all booked or unbooked rooms based on the status provided as a parameter
roomRouter.get("/:booked", commonController.allBookedRoomsStatus);
// Exporting the router to be used by other parts of the application

export default roomRouter;
