const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Belongs to a user
  name: { type: String, required: true },
  phone: { type: String, unique: true, required: true },
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }]
}, { timestamps: true });

module.exports =  mongoose.model('Friend', friendSchema);
