const mongoose = require('mongoose');
require('dotenv').config();
const Trip = require('./models/Trip');
const User = require('./models/User');

const sampleTrips = [
    {
        title: "Eiffel Tower Experience",
        location: "Paris, France",
        price: 1200,
        category: "Luxury",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
        description: "Experience the magic of Paris from the height of the Eiffel Tower. Enjoy a luxury dinner and the city of light.",
        rating: 4.9,
        numReviews: 125,
        itinerary: [
            { day: 1, activity: "Arrival in Paris", description: "Transfer to your luxury hotel and welcome dinner." },
            { day: 2, activity: "Louvre Museum Tour", description: "Guided tour of the world's largest art museum." },
            { day: 3, activity: "Eiffel Tower Dinner", description: "Exclusive evening dinner at the Jules Verne restaurant." }
        ]
    },
    {
        title: "Bali Tropical Retreat",
        location: "Ubud, Indonesia",
        price: 850,
        category: "Adventure",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
        description: "Relax in the heart of the jungle. Visit ancient temples and enjoy world-class spiritual retreats.",
        rating: 4.8,
        numReviews: 98,
        itinerary: [
            { day: 1, activity: "Airport Pickup", description: "Drive to Ubud and check into our jungle villa." },
            { day: 2, activity: "Monkey Forest Visit", description: "Explore the Sacred Monkey Forest Sanctuary." },
            { day: 3, activity: "Yoga & Spa Day", description: "A day of relaxation and spiritual rejuvenation." }
        ]
    },
    {
        title: "Swiss Alps Skiing",
        location: "Zermatt, Switzerland",
        price: 1500,
        category: "Adventure",
        image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99",
        description: "Go skiing in the world-famous Swiss Alps. Perfect for winter sports enthusiasts.",
        rating: 5.0,
        numReviews: 45,
        itinerary: [
            { day: 1, activity: "Ski Gear Setup", description: "Arrive in Zermatt and get fitted for professional ski gear." },
            { day: 2, activity: "Matterhorn Peak Access", description: "Full day of skiing with access to the highest peaks." },
            { day: 3, activity: "Alpine Village Exploration", description: "Visit local shops and enjoy traditional cheese fondue." }
        ]
    },
    {
        title: "Santorini Sunset Cruise",
        location: "Oia, Greece",
        price: 950,
        category: "Luxury",
        image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff",
        description: "A romantic sunset cruise around the white-washed buildings of Oia.",
        rating: 4.7,
        numReviews: 210,
        itinerary: [
            { day: 1, activity: "Caldera View check-in", description: "Arrive at your cliffside resort with stunning views." },
            { day: 2, activity: "Volcano & Hot Springs Tour", description: "Boat trip to the volcanic islands in the Caldera." },
            { day: 3, activity: "Private Sunset Cruise", description: "Sail on a luxury catamaran during the golden hour." }
        ]
    }
];

async function seed() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to MongoDB: ${conn.connection.host}`);
        await Trip.deleteMany({});
        await Trip.insertMany(sampleTrips);
        console.log("Database seeded with premium destinations! 🌟");

        // Create Default Admin
        const adminEmail = "admin@novatravel.com";
        const adminUser = await User.findOne({ email: adminEmail });

        if (!adminUser) {
            await User.create({
                name: "Admin User",
                email: adminEmail,
                password: "admin123",
                role: "admin"
            });
            console.log("Default Admin created: admin@novatravel.com | admin123 🔑");
        } else {
            // Update password to ensure user can login
            adminUser.password = "admin123";
            adminUser.role = "admin"; // Ensure they are admin
            await adminUser.save();
            console.log("Admin credentials refreshed: admin@novatravel.com | admin123 🛡️");
        }

        process.exit(0);
    } catch (err) {
        console.error("Seed Error:", err);
        process.exit(1);
    }
}

seed();
