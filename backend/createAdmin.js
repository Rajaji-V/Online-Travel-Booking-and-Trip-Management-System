const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB for admin creation...");

        const adminEmail = "admin@novatravel.com";
        const adminPassword = "admin123"; // Using the user's requested "admin" logic

        const adminExists = await User.findOne({ email: adminEmail });

        if (adminExists) {
            console.log("Admin user already exists with email:", adminEmail);
            console.log("Details: Username (Email): admin@novatravel.com | Password: admin123");
            process.exit(0);
        }

        const adminUser = await User.create({
            name: "System Admin",
            email: adminEmail,
            password: adminPassword,
            role: "admin"
        });

        if (adminUser) {
            console.log("✅ Admin user created successfully!");
            console.log("-----------------------------------");
            console.log("Email: admin@novatravel.com");
            console.log("Password: admin123");
            console.log("Role: Admin");
            console.log("-----------------------------------");
        }

        process.exit(0);
    } catch (error) {
        console.error("Error creating admin:", error);
        process.exit(1);
    }
};

createAdmin();
