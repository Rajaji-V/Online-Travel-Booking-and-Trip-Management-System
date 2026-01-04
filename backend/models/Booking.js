const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    tripId: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true },
    tripName: String,
    userName: String,        // later we will connect auth
    date: String,
    guests: Number,
    status: { type: String, default: "Upcoming" },
    image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
