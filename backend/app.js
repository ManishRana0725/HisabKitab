const express = require("express");

const app = express();
const mongoose = require("mongoose");
const path = require("path");
require('dotenv').config();

// Database Connection
const URL = process.env.DATABASE_URL;
mongoose.connect(URL , {
   
})
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Database Connection Error:", err));


// middlewares 




// routes 



const port = process.env.PORT || 8080;  
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


