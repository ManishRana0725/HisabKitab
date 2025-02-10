const express = require("express");

const FriendContoroller  = require("../controllers/friendController.js");

const router = express.Router();

router.post('/', FriendContoroller.createFriend);  // Create friend & generate QR
router.get('/:id/qr-pdf', FriendContoroller.getQrPdf);  // Get QR as PDF

module.exports =  router;
