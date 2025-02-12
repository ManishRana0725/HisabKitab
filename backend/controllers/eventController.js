const Event = require("../models/EventModel");

const EventController = {
  // Fetch all transactions for a given event by name
  getEventTransactions: async (req, res) => {
    try {
      const { eventName } = req.params;

      // 🔹 Find event by name & populate transactions
      const event = await Event.findOne({ name: eventName }).populate({
        path: "transactions",
        populate: { path: "friend", select: "name" } // Also get friend's name
      });

      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      res.status(200).json({ event });

    } catch (error) {
      console.error("Error fetching event transactions:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

module.exports = EventController;
