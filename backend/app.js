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
app.use("/qrcodes", express.static(path.join(__dirname, "qrcodes")));

// Database Connection
const URL = process.env.DATABASE_URL;
mongoose
  .connect(URL, { serverSelectionTimeoutMS: 5000 }) // Increase timeout
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Database Connection Error:", err));

// CORS Configuration
const allowedOrigins = [
  "http://localhost:5173",  // Local development
  "https://hisab-kitab-n3k6.vercel.app",  // Vercel Frontend
  "https://hisabkitab-2.web.app", // Firebase Frontend
];

const corsOptions = {
  origin: function (origin, callback) {
    console.log("CORS request from:", origin); // Debugging
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error("Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow cookies/auth headers
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight requests

app.use(express.json()); // Parse JSON body

// Routes
app.use("/friends", friendRoutes);
app.use("/users", userRoutes);
app.use("/transactions", transactionRoutes);
app.use("/event", eventRoutes);

// Server Start
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
