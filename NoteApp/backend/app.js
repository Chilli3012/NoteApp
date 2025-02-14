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
app.use(cors());
app.use(express.json());

// Routes
app.use("/", userRoutes);
app.use("/", noteRoutes);

module.exports = app;
