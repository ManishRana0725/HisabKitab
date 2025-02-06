const express = require("express");

const app = express();
const mongoose = require("mongoose");
const path = require("path");
// require('dotenv').config();


const port = process.env.PORT || 8080;  
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
