const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUser, updateUserProfile} = require("../controllers/user.controller");
const { authenticateToken } = require("../middleware/auth.middleware");

router.post("/create-account", registerUser);
router.post("/login", loginUser);
router.get("/get-user", authenticateToken, getUser);
router.put('/update-profile', authenticateToken, updateUserProfile);

module.exports = router;
