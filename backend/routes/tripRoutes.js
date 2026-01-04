const express = require("express");
const Trip = require("../models/Trip");

const router = express.Router();

// ADD TRIP
router.post("/", async (req, res) => {
  try {
    const newTrip = new Trip(req.body);
    await newTrip.save();
    res.status(201).json({ message: "Trip added successfully", trip: newTrip });
  } catch (error) {
    res.status(500).json({ message: "Error adding trip", error });
  }
});

// GET ALL TRIPS
router.get("/", async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trips" });
  }
});

// GET TRIP BY ID
router.get("/:id", async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    res.json(trip);
  } catch {
    res.status(404).json({ message: "Trip not found" });
  }
});


module.exports = router;
