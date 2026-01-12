const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tripId: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true },
    tripName: String, // Kept for legacy if needed
    destination: String, // Adding for frontend compatibility
    date: String,
    guests: Number,
    totalPrice: Number,
    status: { type: String, default: "Upcoming" },
    image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
