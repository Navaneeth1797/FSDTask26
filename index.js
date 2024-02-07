// Importing the Express framework
import express from "express";
// Importing the main route handler from './routes/index.js'
import appRoute from "./routes/index.js";
// Creating an instance of the Express application
let app = express();
// Defining the port number for the server to listen on, using the environment variable PORT if available, otherwise defaulting to 8009
let PORT = process.env.PORT || 8009;
// Middleware to parse incoming JSON requests
app.use(express.json());
// Mounting the main route handler under the root path '/'
app.use("/", appRoute);
// Starting the Express server to listen for incoming requests on the specified port
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
