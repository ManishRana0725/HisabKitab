const Friend = require("../models/FriendModel.js");
const generateQrPdf = require("../utils/qrToPdf.js")
const generateQRCode = require("../utils/qrGenerator.js")

// Create a new friend & generate QR code image
const FriendController = {
    createFriend : async (req, res) => {
      try {
        const { name, phone, userId, eventName } = req.body;
    
        // Check if friend already exists
        const existingFriend = await Friend.findOne({ phone, user: userId });
        if (existingFriend) {
          return res.status(400).json({ message: "Friend already exists" });
        }
    
        // Create new friend
        const newFriend = new Friend({ name, phone, user: userId });
        await newFriend.save();
    
        // Generate QR Code with event name and friend's name in URL & file name
        const qrCodeImage = await generateQRCode(newFriend._id, name, eventName);
    
        res.status(201).json({ friend: newFriend, qrCodeImage });
      } catch (error) {
        console.error("Error creating friend:", error);
        res.status(500).json({ message: "Error creating friend", error: error.message });
      }
    },
    getQrPdf: async (req, res) => {
      try {
        const name = req.params.name;  // Get the friend & event name from the URL
        console.log("🔍 Generating PDF for:", name);  // Debugging log
    
        const pdfUrl = await generateQrPdf(name);  // Use name for file lookup
        res.json({ pdfUrl });
    
      } catch (error) {
        console.error("❌ PDF Generation Error:", error);
        res.status(500).json({ message: "Failed to generate PDF", error });
      }
    }
    
}
module.exports = FriendController;