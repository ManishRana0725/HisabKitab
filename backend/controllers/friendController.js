const Friend = require("../models/FriendModel.js");
const Event = require("../models/EventModel.js");
const generateQrPdf = require("../utils/qrToPdf.js")
const getpdf = require("../public/getpdf.js");
const generateQRCode = require("../utils/qrGenerator.js")

// Create a new friend & generate QR code image
const FriendController = {
    createFriend : async (req, res) => {
      try {
        const { name, phone, userId, eventName } = req.body;
        
        // 🔹 Find or create the event
        let event = await Event.findOne({ name: eventName, user: userId });

        if (!event) {
            event = new Event({
                name: eventName,
                user: userId,
                date: new Date(),
                transactions: []
            });
            await event.save();
        }

        // 🔹 Check if the friend already exists for this user
        let friend = await Friend.findOne({ name, user: userId });

        if (!friend) {
            // ✅ Create a new friend
            friend = new Friend({ name, phone, user: userId, events: [] });
        }

        // 🔹 Check if this friend is already part of the event
        const alreadyInEvent = friend.events.some(e => e.event.equals(event._id));

        if (!alreadyInEvent) {
            // ✅ Add event ID & Name to friend
            friend.events.push({ event: event._id, eventName: event.name });
            await friend.save();
        }
        
        // 🔹 Generate QR Code for this friend and event
        const qrCodeImage = await generateQRCode(friend._id, friend.name, event.name);
        const qrCodePdf = await getpdf(qrCodeImage);
        res.status(201).json({ friend, qrCodePdf });

    } catch (error) {
        console.error("❌ Error creating friend:", error);
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