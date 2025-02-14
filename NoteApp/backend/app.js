require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.config");

const userRoutes = require("./routes/user.routes");
const noteRoutes = require("./routes/note.routes");

const app = express();

// Connect to the database
connectDB();

// Dynamically set allowed origins based on the request origin
const allowedOrigins = [
    "http://localhost:5173",    // Local development (Vite)
    "http://localhost:3000",    // Local testing of build (npx serve)
    "http://192.168.0.187:3000",
    "https://note-app-six-drab.vercel.app", // Deployed frontend on Vercel
    "https://silly-kelpie-977318.netlify.app",
    "https://note-app-6799.netlify.app/"// Deployed frontend on Netlify
];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
};
app.use((req, res, next) => {
    console.log(`Request Origin: ${req.headers.origin}`);
    console.log(`Request Method: ${req.method}`);
    next();
});

// Apply the CORS middleware
app.use(cors(corsOptions));

// Explicitly handle preflight `OPTIONS` requests
app.options("*", cors(corsOptions));





// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use("/", userRoutes);
app.use("/", noteRoutes);

module.exports = app;
