const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const friendRoutes = require("./routes/friendRoutes"); // Import friend routes
//const transactionRoutes = require("./routes/transactionRoutes"); // Import transaction routes
const userRoutes = require("./routes/userRoutes");


const app = express();

//  Database Connection
const URL = process.env.DATABASE_URL;
mongoose
  .connect(URL)
  .then(() => console.log(" Connected to MongoDB"))
  .catch((err) => console.log(" Database Connection Error:", err));

//  Middlewares
app.use(express.json()); // Parse JSON body
app.use(cors()); // Enable CORS

//  Routes
app.use("/friends", friendRoutes); // Friend-related routes
app.use("/users", userRoutes); // userroutes
//app.use("/transactions", transactionRoutes); // Transaction-related routes

//  Server Start
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(` Server is running on http://localhost:${port}`);
});
