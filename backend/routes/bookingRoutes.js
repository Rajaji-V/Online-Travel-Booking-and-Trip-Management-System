const express = require("express");
const Booking = require("../models/Booking");
const router = express.Router();

// CREATE BOOKING
router.post("/", async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL BOOKINGS (later we’ll filter by user)
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch {
    res.status(500).json({ message: "Error fetching bookings" });
  }
});

// DELETE BOOKING
router.delete("/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking cancelled" });
  } catch {
    res.status(500).json({ message: "Error cancelling booking" });
  }
});


module.exports = router;
