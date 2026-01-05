const mongoose = require('mongoose');
require('dotenv').config();
const Trip = require('./models/Trip');

const sampleTrips = [
    {
        title: "Eiffel Tower Experience",
        location: "Paris, France",
        price: 1200,
        category: "Luxury",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
        description: "Experience the magic of Paris from the height of the Eiffel Tower. Enjoy a luxury dinner and the city of light.",
        rating: 4.9,
        numReviews: 125
    },
    {
        title: "Bali Tropical Retreat",
        location: "Ubud, Indonesia",
        price: 850,
        category: "Adventure",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
        description: "Relax in the heart of the jungle. Visit ancient temples and enjoy world-class spiritual retreats.",
        rating: 4.8,
        numReviews: 98
    },
    {
        title: "Swiss Alps Skiing",
        location: "Zermatt, Switzerland",
        price: 1500,
        category: "Adventure",
        image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99",
        description: "Go skiing in the world-famous Swiss Alps. Perfect for winter sports enthusiasts.",
        rating: 5.0,
        numReviews: 45
    },
    {
        title: "Santorini Sunset Cruise",
        location: "Oia, Greece",
        price: 950,
        category: "Luxury",
        image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff",
        description: "A romantic sunset cruise around the white-washed buildings of Oia.",
        rating: 4.7,
        numReviews: 210
    }
];

async function seed() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to MongoDB: ${conn.connection.host}`);
        await Trip.deleteMany({});
        await Trip.insertMany(sampleTrips);
        console.log("Database seeded with premium destinations! 🌟");
        process.exit(0);
    } catch (err) {
        console.error("Seed Error:", err);
        process.exit(1);
    }
}

seed();
