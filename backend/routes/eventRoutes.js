const express = require("express");
const EventController = require("../controllers/eventController");

const router = express.Router();

 // fro all event name 
router.get("/all" , EventController.getAllEvents)
// Fetch transactions for an event (by event name)
router.get("/:eventId", EventController.getEventTransactions);

module.exports = router;
