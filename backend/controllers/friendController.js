
const {Friend} = require("../models/FriendModel.js");

const {  generateQrPdf} = require("../utils/qrToPdf.js")
const {  generateQRCode} = require("../utils/qrGenerator.js")
//const { createFriend, getQrPdf } = require("../controllers/friendController");
// Create a new friend & generate QR code image
const FriendController = {
    createFriend : async (req, res) => {
        try {
          const { name, phone, userId } = req.body;
            
          // Check if friend already exists
          const existingFriend = await Friend.findOne({ phone, user: userId });
          if (existingFriend) {
            return res.status(400).json({ message: 'Friend already exists' });
          }
          
          // Create new friend
          const newFriend = new Friend({ name, phone, user: userId });
          await newFriend.save();
      
          // Generate QR Code image
          const qrCodeImage = await generateQRCode(newFriend._id);
      
          res.status(201).json({ friend: newFriend, qrCodeImage });
        } catch (error) {
          res.status(500).json({ message: 'Error creating friend', error });
        }
    },
    getQrPdf : async (req, res) => {
        try {
          const pdfUrl = await generateQrPdf(req.params.id);
          res.json({ pdfUrl });
        } catch (error) {
          res.status(500).json({ message: 'Failed to generate PDF', error });
        }
    }
}
module.exports = FriendController;