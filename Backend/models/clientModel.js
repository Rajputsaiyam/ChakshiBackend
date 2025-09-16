const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  cases: [{ type: String }],
  documents: { type: Number, required: true },
  lastContact: { type: Date, required: true },
  billingStatus: { type: String, enum: ['Paid', 'Pending', 'Overdue'], required: true },
  totalBilled: { type: Number, required: true },
  preferredContact: { type: String, enum: ['email', 'WhatsApp', 'SMS'], required: true },
  avatar: { type: String, required: true },
  company: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Client', clientSchema);