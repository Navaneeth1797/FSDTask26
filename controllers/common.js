import { format } from "date-fns";
// Array to store room data
let rooms = [
  {
    id: 1,
    name: "Room ocean view",
    seats: 2,
    amenities: ["Projector", "Whiteboard"],
    pricePerHour: 500,
    roomId: 1,
    booked: false,
  },
  {
    id: 2,
    name: "Room swimming pool view",
    seats: 70,
    amenities: ["Tv", "two king size bed"],
    pricePerHour: 1500,
    roomId: 2,
    booked: true,
  },
  {
    id: 3,
    name: "Room city view",
    seats: 100,
    amenities: ["ac", "bath tub"],
    pricePerHour: 550,
    roomId: 3,
    booked: false,
  },
  {
    id: 4,
    name: "Room city view",
    seats: 6,
    amenities: ["gym", "mini fridge"],
    pricePerHour: 2500,
    roomId: 4,
    booked: true,
  },
  {
    id: 5,
    name: "Room ocean view",
    seats: 200,
    amenities: ["swimming pool", "jacuzzi"],
    pricePerHour: 5000,
    roomId: 5,
    booked: true,
  },
  {
    id: 6,
    name: "Room ocean view",
    seats: 200,
    amenities: ["swimming pool", "jacuzzi"],
    pricePerHour: 5000,
    roomId: 6,
    booked: true,
  },
];
// Array to store booking data
let bookings = [
  {
    id: 1,
    customerName: "sherlock",
    startTime: "2024-02-01T09:00:00",
    endTime: "2024-02-01T10:00:00",
    bookingId: 1,
    roomId: 1,
    date: "2024-02-01",
  },
  {
    id: 2,
    customerName: "ali",
    startTime: "2021-07-27T08:00:00",
    endTime: "2021-07-30T09:00:00",
    bookingId: 2,
    roomId: 2,
    date: "2021-07-27",
  },
  {
    id: 3,
    customerName: "michel",
    startTime: "2022-03-17T09:00:00",
    endTime: "2022-03-24T10:00:00",
    bookingId: 3,
    roomId: 3,
    date: "2022-03-17",
  },
  {
    id: 4,
    customerName: "shruthi",
    startTime: "2020-04-09T10:00:00",
    endTime: "2024-04-11T11:00:00",
    bookingId: 4,
    roomId: 4,
    date: "2020-04-09",
  },
  {
    id: 5,
    customerName: "gabby",
    startTime: "2024-02-13T09:00:00",
    endTime: "2024-02-15T10:00:00",
    bookingId: 5,
    roomId: 5,
    date: "2024-02-13",
  },
  {
    id: 6,
    customerName: "gabby",
    startTime: "2021-09-13T09:00:00",
    endTime: "2021-09-15T10:00:00",
    bookingId: 6,
    roomId: 6,
    date: "2021-09-13",
  },
];
// Function to fetch all rooms and bookings
let getAllBookingsAndRooms = (req, res) => {
  try {
    // Formatting booking dates
    let formattedBookings = bookings.map((booking) => ({
      ...booking,
      startTime: format(new Date(booking.startTime), "yyyy-MM-dd HH:mm:ss"),
      endTime: format(new Date(booking.endTime), "yyyy-MM-dd HH:mm:ss"),
    }));
    // Sending response with all rooms and bookings
    res.status(200).send({
      message: " fetched all data successfully",
      rooms,
      bookings: formattedBookings,
    });
  } catch (error) {
    // Sending response with all rooms and bookings
    res.status(500).send({
      message: "error fetchig all data",
    });
  }
};
// Function to create a new room
let createRoom = (req, res) => {
  try {
    // Extracting necessary data from request body
    let { seats, pricePerHour } = req.body || {};
    // Validation for required fields
    if (!seats || !pricePerHour) {
      return res.status(400).json({
        error: "Seats and price per hour are required for creating a room",
      });
    }
    // Generating unique ID for the new room
    let id = rooms.length ? rooms[rooms.length - 1].id + 1 : 1;
    req.body.id = id;
    // Adding the new room to the rooms array
    rooms.push(req.body);
    console.log(req.body);
    // Sending success response with created room
    res.status(201).send({
      message: "Room created successfully",
      rooms: rooms,
    });
  } catch (error) {
    // Error handling
    console.error("Error creating room:", error);
    res.status(500).send({
      message: "Internal server error",
    });
  }
};
// Function to book a room
let bookRoom = (req, res) => {
  try {
    // Extracting necessary data from request body
    let { customerName, startTime, endTime, roomId, date } = req.body || {};
    // Validation for required fields
    if (!customerName || !startTime || !endTime || !roomId || !date) {
      return res.status(400).json({
        error:
          "Customer name, start time, end time, room ID, and date are required for booking.",
      });
    }
    // Checking for room availability
    let availableBooking = bookings.find((booking) => {
      return (
        booking.roomId === roomId &&
        booking.date === date &&
        ((startTime >= booking.startTime && startTime < booking.endTime) ||
          (endTime > booking.startTime && endTime <= booking.endTime) ||
          (startTime <= booking.startTime && endTime >= booking.endTime))
      );
    });
    // If room is not available, return error
    if (availableBooking) {
      return res.status(409).json({
        error: "No rooms avialable for the specified date and time.",
      });
    }
    // Generating unique ID for the new booking
    let id = bookings.length ? bookings[bookings.length - 1].id + 1 : 1;
    req.body.id = id;
    // Adding the new booking to the bookings array
    bookings.push(req.body);
    console.log(req.body);
    // Sending success response with booked room
    res.status(201).send({
      message: "Room booked successfully",
      bookings: bookings,
    });
  } catch (error) {
    // Error handling
    console.error("Error booking room:", error);
    res.status(500).send({
      message: "Internal server error",
    });
  }
};

// Function to get all customers with their booked data
let getAllCustomersWithBookedData = (req, res) => {
  try {
    // Mapping bookings to include room name and formatted dates
    let bookedData = bookings.map((booking) => {
      let room = rooms.find((room) => room.id === booking.id);
      return {
        customerName: booking.customerName,
        roomName: room.name,
        startTime: format(new Date(booking.startTime), "yyyy-MM-dd HH:mm:ss"),
        endTime: format(new Date(booking.endTime), "yyyy-MM-dd HH:mm:ss"),
        date: booking.date,
      };
    });
    // Sending response with customers and their booked data
    res.status(200).send({
      message: " customers with their booked data",
      customers: bookedData,
    });
  } catch (error) {
    // Error handling
    res.status(500).send({
      message: "Error listing customers with their booked data",
    });
  }
};
//Function to get booking history of a customer
let getCustomerRoomHistory = async (req, res) => {
  try {
    // Extracting query parameter
    let { customerName } = req.query;
    // Validation for customer name
    if (!customerName) {
      return res.status(400).json({
        error: "Customer name is required.",
      });
    }
    // Filtering bookings based on customer name
    let customerBookings = bookings.filter(
      (booking) => booking.customerName === customerName
    );
    // Mapping customer bookings to include room name and formatted dates
    let customerBookingDetails = customerBookings.map((booking) => {
      let room = rooms.find((room) => room.id === room.roomId);
      if (!room) {
        return {
          customerName: booking.customerName,
          bookingId: booking.bookingId,
          errorMessage: "Room not found",
        };
      }
      return {
        customerName: booking.customerName,
        roomName: room.name,
        startTime: format(new Date(booking.startTime), "yyyy-MM-dd HH:mm:ss"),
        endTime: format(new Date(booking.endTime), "yyyy-MM-dd HH:mm:ss"),
        date: booking.date,
        bookingDate: booking.date,
        bookingId: booking.bookingId,
        bookedStatus: room.booked ? "Booked" : " Not booked",
      };
    });
    // Sending response with booking details for the customer
    res.status(200).send({
      message: `Booking details for customer ${customerName}`,
      bookings: customerBookingDetails,
      totalBookings: customerBookings.length,
    });
  } catch (error) {
    console.error("Error fetching customer booking details:", error);

    res.status(500).send({
      message: "Internal server error",
    });
  }
};

// Function to get all booked/unbooked rooms status
const allBookedRoomsStatus = (req, res) => {
  try {
    // Extracting parameter from request
    let { booked } = req.params;
    let filteredRooms = rooms;
    // Filtering rooms based on booked status
    if (booked) {
      filteredRooms = rooms.filter(
        (room) => room.booked === (booked === "true")
      );
    }
    // Mapping rooms to include booking details
    let bookedRooms = filteredRooms.map((bookedRoom) => {
      let roomBookings = bookings.filter(
        (booking) => booking.id === bookedRoom.id
      );
      return {
        ...bookedRoom,
        bookings: roomBookings.map((booking) => ({
          customerName: booking.customerName,
          startTime: format(new Date(booking.startTime), "yyyy-MM-dd HH:mm:ss"),
          endTime: format(new Date(booking.endTime), "yyyy-MM-dd HH:mm:ss"),
          roomId: booking.roomId,
          date: booking.date,
          bookingStatus: bookedRoom.booked ? "Booked" : "Not Booked",
        })),
      };
    });
    // Sending response with booked rooms
    res.status(200).send({
      message: `Listed all ${booked ? "booked" : "unbooked"} rooms `,
      rooms: bookedRooms,
    });
  } catch (error) {
    // Error handling
    res.status(500).send({
      message: "Error listing rooms with their booked status",
    });
  }
};

// Exporting all controller functions

export default {
  createRoom,
  getAllBookingsAndRooms,
  bookRoom,
  getAllCustomersWithBookedData,
  getCustomerRoomHistory,
  allBookedRoomsStatus,
};
