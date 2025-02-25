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
        const qrCodePdf = await generateQrPdf(qrCodeImage.replace('/qrcodes/', '').replace('.png', ''));

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
    },
    getAllFriends: async (req, res) => {
      try {
          const friends = await Friend.find()
              .populate({
                  path: "events.event",
                  select: "name date"  // Get event name & date
              })
              .populate({
                  path: "transactions",  
                  select: "amount event date"  // Get transaction amount, event & date
              });

          if (!friends || friends.length === 0) {
              return res.status(404).json({ message: "No friends found" });
          }

          // ✅ Structure the response to include transactions separately
          const formattedFriends = friends.map(friend => ({
              _id: friend._id,
              name: friend.name,
              phone: friend.phone,
              events: friend.events,
              transactions: friend.transactions.map(transaction => ({
                  amount: transaction.amount,
                  event: transaction.event,
                  date: transaction.date
              }))
          }));

          res.status(200).json({ friends: formattedFriends });

      } catch (error) {
          console.error("❌ Error fetching friends:", error);
          res.status(500).json({ message: "Internal Server Error" });
      }
  },
  getFriendById: async (req, res) => {
    try {
        const { id } = req.params;
        
        // 🔹 Find the friend by ID & populate related fields
        const friend = await Friend.findById(id)
            .populate({
                path: "events.event",
                select: "name date"  // Get event name & date
            })
            .populate({
                path: "transactions",
                select: "amount event type date"  // Get transaction amount, event, type, and date
            });

        if (!friend) {
            return res.status(404).json({ message: "Friend not found" });
        }

        // 🔹 Create a map to sum transactions per event
        const eventTransactionMap = {};

        friend.transactions.forEach(txn => {
            const eventId = txn.event.toString();

            if (!eventTransactionMap[eventId]) {
                eventTransactionMap[eventId] = {
                    eventId,
                    eventName: "",
                    totalGiven: 0,
                    totalReceived: 0,
                };
            }

            // Assign event name from events array
            const eventDetails = friend.events.find(e => e.event._id.toString() === eventId);
            if (eventDetails) {
                eventTransactionMap[eventId].eventName = eventDetails.event.name;
            }

            // Sum amounts based on transaction type
            if (txn.type === "debit") {
                eventTransactionMap[eventId].totalGiven += txn.amount;
            } else {
                eventTransactionMap[eventId].totalReceived += txn.amount;
            }
        });

        // Convert eventTransactionMap to an array
        const eventSummary = Object.values(eventTransactionMap);

        // ✅ Format response
        const formattedFriend = {
            _id: friend._id,
            name: friend.name,
            phone: friend.phone,
            events: eventSummary, // 🔹 Contains event details + total given/received
        };

        res.status(200).json({ friend: formattedFriend });

    } catch (error) {
        console.error("❌ Error fetching friend:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


    
}
module.exports = FriendController;