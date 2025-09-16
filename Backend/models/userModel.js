const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  salt: { type: String, required: true },   // required for hash
  Address: { type: String },
  PinCode: { type: String },
  ContactNo: { type: String },
  Role: { type: String, enum: [ 'advocate', 'client', 'admin'], default: "client" }
});

module.exports = mongoose.model("User", userSchema);