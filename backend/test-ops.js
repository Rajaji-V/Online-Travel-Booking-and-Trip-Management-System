const mongoose = require('mongoose');
require('dotenv').config();

async function testDB() {
    try {
        console.log("Connecting to:", process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected. Listing collections...");
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log("Collections:", collections.map(c => c.name));
        process.exit(0);
    } catch (err) {
        console.error("DB Operation Error:", err);
        process.exit(1);
    }
}

testDB();
