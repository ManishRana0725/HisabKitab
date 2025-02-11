const express = require("express");

const FriendContoroller  = require("../controllers/friendController.js");

const router = express.Router();

router.post('/', FriendContoroller.createFriend);  // Create friend & generate QR
router.get('/qr-pdf/:name', FriendContoroller.getQrPdf);  // Get QR as PDF

module.exports =  router;
