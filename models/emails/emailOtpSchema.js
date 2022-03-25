const mongoose = require("mongoose");

const emailOtpSchema = new mongoose.Schema({
  transid:{
    type: String,
    required: [true, "Transaction id missing"],
  },
  email: {
    type: String,
    required: [true, "Email is missing"],
  },
  otp: {
    type: String,
    required: [true, "OTP is missing"],    
  },
  createdAt: { type: Date, expires: '5m', default: Date.now }
});

module.exports = mongoose.model("emails", emailOtpSchema);
