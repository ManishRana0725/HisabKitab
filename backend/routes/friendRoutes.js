const express = require("express");

const FriendContoroller  = require("../controllers/friendController.js");

const router = express.Router();

router.post('/', FriendContoroller.createFriend);  // Create friend & generate QR
router.get('/qr-pdf/:name', FriendContoroller.getQrPdf);  // Get QR as PDF
router.get("/all", FriendContoroller.getAllFriends); // to get allthe friends
router.get('/:id', FriendContoroller.getFriendById); // Get a friend by ID

module.exports =  router;
