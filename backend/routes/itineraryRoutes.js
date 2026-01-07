const express = require("express");
const router = express.Router();
const Itinerary = require("../models/Itinerary");
const { protect } = require("../middleware/authMiddleware");

// GET all itineraries for the logged-in user
router.get("/", protect, async (req, res) => {
    try {
        const itineraries = await Itinerary.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(itineraries);
    } catch (error) {
        res.status(500).json({ message: "Error fetching itineraries", error: error.message });
    }
});

// POST create a new itinerary
router.post("/", protect, async (req, res) => {
    const { title, trip, activities } = req.body;
    try {
        const itinerary = await Itinerary.create({
            user: req.user._id,
            title,
            trip,
            activities,
        });
        res.status(201).json(itinerary);
    } catch (error) {
        res.status(500).json({ message: "Error creating itinerary", error: error.message });
    }
});

// PUT update an itinerary
router.put("/:id", protect, async (req, res) => {
    try {
        const itinerary = await Itinerary.findById(req.params.id);

        if (!itinerary) {
            return res.status(404).json({ message: "Itinerary not found" });
        }

        // Ensure user owns the itinerary
        if (itinerary.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" });
        }

        itinerary.title = req.body.title || itinerary.title;
        itinerary.trip = req.body.trip || itinerary.trip;
        itinerary.activities = req.body.activities || itinerary.activities;

        const updatedItinerary = await itinerary.save();
        res.json(updatedItinerary);
    } catch (error) {
        res.status(500).json({ message: "Error updating itinerary", error: error.message });
    }
});

// DELETE an itinerary
router.delete("/:id", protect, async (req, res) => {
    try {
        const itinerary = await Itinerary.findById(req.params.id);

        if (!itinerary) {
            return res.status(404).json({ message: "Itinerary not found" });
        }

        // Ensure user owns the itinerary
        if (itinerary.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" });
        }

        await itinerary.deleteOne();
        res.json({ message: "Itinerary removed" });
    } catch (error) {
        res.status(500).json({ message: "Error removing itinerary", error: error.message });
    }
});

module.exports = router;
