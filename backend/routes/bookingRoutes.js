const express = require("express");
const Booking = require("../models/Booking");
const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();

const Trip = require("../models/Trip");

// CREATE BOOKING
router.post("/", protect, async (req, res) => {
  const { tripId, date, guests, totalPrice } = req.body;
  try {
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    const booking = await Booking.create({
      user: req.user._id,
      tripId,
      tripName: trip.title,
      destination: trip.title,
      date,
      guests,
      totalPrice: totalPrice || trip.price * guests,
      image: trip.image,
    });
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET USER BOOKINGS
router.get("/mybookings", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate("tripId");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings" });
  }
});

// GET ALL BOOKINGS (Admin only)
router.get("/", protect, admin, async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user", "name email").populate("tripId");
    res.json(bookings);
  } catch {
    res.status(500).json({ message: "Error fetching bookings" });
  }
});

// DELETE BOOKING
router.delete("/:id", protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Check if user owns the booking or is admin
    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(401).json({ message: "Not authorized" });
    }

    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking cancelled" });
  } catch {
    res.status(500).json({ message: "Error cancelling booking" });
  }
});

module.exports = router;
