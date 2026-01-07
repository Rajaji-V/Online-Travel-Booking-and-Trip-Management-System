const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        trip: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Trip",
        },
        title: {
            type: String,
            required: true,
        },
        activities: [
            {
                date: {
                    type: Date,
                    required: true,
                },
                time: {
                    type: String,
                },
                description: {
                    type: String,
                    required: true,
                },
                location: {
                    type: String,
                },
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Itinerary", itinerarySchema);
