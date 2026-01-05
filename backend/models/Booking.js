const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tripId: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true },
    tripName: String,
    date: String,
    guests: Number,
    status: { type: String, default: "Upcoming" },
    image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
