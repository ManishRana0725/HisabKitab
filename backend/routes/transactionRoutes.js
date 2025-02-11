const express = require("express");
const TransactionController = require("../controllers/transactionController");

const router = express.Router();

// Record a payment transaction (When a QR is scanned)
router.post("/save", TransactionController.recordTransaction);

// Get transaction history of a friend
router.get("/:friendId", TransactionController.getTransactions);



// // Get all transactions for a specific event by name
// router.get("/transactions/event/:eventName", TransactionController.getEventTransactions);



module.exports = router;
