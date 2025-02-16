const Event = require("../models/EventModel");

const EventController = {
  // Fetch all transactions for a given event by name
  // getEventTransactions: async (req, res) => {
  //   try {
  //     const { eventName } = req.params;

  //     // 🔹 Find event by name & populate transactions
  //     const event = await Event.findOne({ name: eventName }).populate({
  //       path: "transactions",
  //       populate: { path: "friend", select: "name" } // Also get friend's name
  //     });

  //     if (!event) {
  //       return res.status(404).json({ message: "Event not found" });
  //     }

  //     res.status(200).json({ event });

  //   } catch (error) {
  //     console.error("Error fetching event transactions:", error);
  //     res.status(500).json({ message: "Internal Server Error" });
  //   }
  // },
  getEventTransactions: async (req, res) => {
    try {
      const { eventId } = req.params; // Extract event ID from request params

      // 🔹 Find event by ID & populate transactions
      const event = await Event.findById(eventId).populate({
        path: "transactions",
        populate: { path: "friend", select: "name" } // Also get friend's name
      });

      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      res.status(200).json({ event });

    } catch (error) {
      console.error("Error fetching event transactions:", error);
      
      // Handle invalid MongoDB ObjectId format errors
      if (error.name === "CastError") {
        return res.status(400).json({ message: "Invalid Event ID format" });
      }

      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getAllEvents: async (req, res) => {
    try {
      const events = await Event.find({}, "name _id"); // Fetch only name & ID

      if (events.length === 0) {
        return res.status(404).json({ message: "No events found" });
      }

      res.status(200).json({ events });

    } catch (error) {
      console.error("Error fetching all events:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

module.exports = EventController;
