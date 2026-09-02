const mongoose = require('mongoose');

// Check if MONGODB_URI is provided
if (!process.env.MONGODB_URI) {
    console.error("❌ ERROR: MONGODB_URI environment variable is not set!");
    console.error("Please set MONGODB_URI in your environment variables or .env file");
    process.exit(1);
}

// Connect to MongoDB with proper options
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    retryWrites: true,
    w: "majority"
});

const db = mongoose.connection;

db.on("connected", () => {
    console.log("✅ MongoDB is connected successfully");
});

db.on("disconnected", () => {
    console.log("⚠️  MongoDB is disconnected");
});

db.on("error", (error) => {
    console.error("❌ MongoDB connection error:", error.message);
    console.error(error);
});

module.exports = db;