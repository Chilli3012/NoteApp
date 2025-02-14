require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.config");

const userRoutes = require("./routes/user.routes");
const noteRoutes = require("./routes/note.routes");

const app = express();

// Connect to the database
connectDB();

// Middleware
const cors = require("cors");

// Dynamically set allowed origins based on the request origin
const allowedOrigins = [
    "http://localhost:5173",    // Local development (Vite)
    "http://localhost:3000",    // Local testing of build (npx serve)
    "https://note-app-six-drab.vercel.app" // Deployed frontend
];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            // Allow requests with matching origins or server-to-server calls (no origin)
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods
    allowedHeaders: "Content-Type,Authorization", // Allowed headers
};

// Apply the CORS middleware
app.use(cors(corsOptions));


app.use(express.json());

// Routes
app.use("/", userRoutes);
app.use("/", noteRoutes);

module.exports = app;
