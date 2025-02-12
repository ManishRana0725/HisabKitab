const express = require("express");
const EventController = require("../controllers/eventController");

const router = express.Router();

// Fetch transactions for an event (by event name)
router.get("/:eventName", EventController.getEventTransactions);

module.exports = router;
