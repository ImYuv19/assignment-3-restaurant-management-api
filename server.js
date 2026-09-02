require("dotenv").config();
const express = require('express');
const db = require("./config/db");
const restaurantRouter = require("./router/restaurantRouter");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/restaurants", restaurantRouter);

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({ status: "Server is running ✅", timestamp: new Date() });
});

// Root endpoint
app.get("/", (req, res) => {
    res.status(200).json({ 
        message: "Welcome to Restaurant Management API",
        version: "1.0.0",
        author: "Yuvraj"
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error("Error:", err.message);
    res.status(err.status || 500).json({ 
        message: err.message || "Internal Server Error" 
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// Start server
const PORT = process.env.PORT || 4000;

// Wait for database connection before starting server
const startServer = () => {
    try {
        if (db.readyState === 1) {
            // Database is connected (state 1 = connected)
            app.listen(PORT, () => {
                console.log(`✅ Server is running on port ${PORT}`);
                console.log(`✅ Database is connected and ready`);
            });
        } else {
            // Retry if database is not ready yet
            setTimeout(startServer, 500);
        }
    } catch (error) {
        console.error("❌ Failed to start server:", error.message);
        process.exit(1);
    }
};

// Start the server after a small delay to ensure db connection is established
setTimeout(startServer, 1000);

