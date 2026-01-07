const express = require("express");
const Trip = require("../models/Trip");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// 1. GET ALL TRIPS (with Search & Category filtering)
router.get("/", async (req, res) => {
  try {
    const { keyword, category } = req.query;
    let query = {};

    if (keyword) {
      query.title = { $regex: keyword, $options: "i" };
    }

    if (category && category !== "All") {
      query.category = category;
    }

    const trips = await Trip.find(query);
    res.json(trips);
  } catch (error) {
    console.error("Error fetching trips:", error);
    res.status(500).json({ message: "Error fetching trips", error: error.message });
  }
});

// 2. GET TRIP BY ID
router.get("/:id", async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    res.json(trip);
  } catch (error) {
    res.status(404).json({ message: "Trip not found" });
  }
});

// 3. ADD TRIP (Admin only)
router.post("/", protect, admin, async (req, res) => {
  try {
    const { title, location, price, image, category, description, itinerary } = req.body;
    const newTrip = new Trip({ title, location, price, image, category, description, itinerary });
    await newTrip.save();
    res.status(201).json({ message: "Trip added successfully", trip: newTrip });
  } catch (error) {
    res.status(500).json({ message: "Error adding trip", error: error.message });
  }
});

// 4. UPDATE TRIP (Admin only)
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (trip) {
      trip.title = req.body.title || trip.title;
      trip.location = req.body.location || trip.location;
      trip.price = req.body.price || trip.price;
      trip.image = req.body.image || trip.image;
      trip.category = req.body.category || trip.category;
      trip.description = req.body.description || trip.description;
      trip.itinerary = req.body.itinerary || trip.itinerary;

      const updatedTrip = await trip.save();
      res.json(updatedTrip);
    } else {
      res.status(404).json({ message: "Trip not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating trip" });
  }
});

// 5. DELETE TRIP (Admin only)
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (trip) {
      await trip.deleteOne();
      res.json({ message: "Trip removed" });
    } else {
      res.status(404).json({ message: "Trip not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting trip" });
  }
});

// 6. CREATE TRIP REVIEW
router.post("/:id/reviews", protect, async (req, res) => {
  const { rating, comment } = req.body;
  try {
    const trip = await Trip.findById(req.params.id);

    if (trip) {
      const alreadyReviewed = trip.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        return res.status(400).json({ message: "Trip already reviewed" });
      }

      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      trip.reviews.push(review);
      trip.numReviews = trip.reviews.length;
      trip.rating =
        trip.reviews.reduce((acc, item) => item.rating + acc, 0) /
        trip.reviews.length;

      await trip.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404).json({ message: "Trip not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error adding review" });
  }
});

module.exports = router;
