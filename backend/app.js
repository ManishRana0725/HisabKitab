const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const friendRoutes = require("./routes/friendRoutes"); // Import friend routes
const transactionRoutes = require("./routes/transactionRoutes"); // Import transaction routes
const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");


const app = express();

//  Database Connection
const URL = process.env.DATABASE_URL;
mongoose
  .connect(URL , {serverSelectionTimeoutMS: 5000, })// Increase timeout
  .then(() => console.log(" Connected to MongoDB"))
  .catch((err) => console.log(" Database Connection Error:", err));

//  Middlewares
app.use(express.json()); // Parse JSON body
const cors = require("cors");

const allowedOrigins = [
  "http://localhost:5173",  // Local development
  "https://hisabkitab-2.web.app"  // Deployed frontend
  
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow cookies/auth headers
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight requests
//  Routes
app.use("/friends", friendRoutes); // Friend-related routes
app.use("/users", userRoutes); // userroutes
app.use("/transactions", transactionRoutes); // Transaction-related routes
//app.use("/pay" , "i am payment routes") // payment routes
app.use("/event", eventRoutes);// Use Event Routes


//  Server Start 
const PORT = process.env.PORT || 10000; 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

