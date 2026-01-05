const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

// REGISTER USER
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User already exists" });

        const user = await User.create({ name, email, password });
        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                favorites: user.favorites,
                token: generateToken(user._id),
            });
        }
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
});

// LOGIN USER
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }).populate("favorites");
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                favorites: user.favorites,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error logging in" });
    }
});

// TOGGLE FAVORITE
router.post("/favorites", protect, async (req, res) => {
    const { tripId } = req.body;
    try {
        const user = await User.findById(req.user._id);
        const index = user.favorites.indexOf(tripId);

        if (index > -1) {
            user.favorites.splice(index, 1);
        } else {
            user.favorites.push(tripId);
        }

        await user.save();
        const updatedUser = await User.findById(req.user._id).populate("favorites");
        res.json(updatedUser.favorites);
    } catch (error) {
        res.status(500).json({ message: "Error updating favorites" });
    }
});

// GET PROFILE
router.get("/profile", protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("favorites");
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching profile" });
    }
});

// GET ALL USERS (Admin only)
router.get("/", protect, admin, async (req, res) => {
    try {
        const users = await User.find({}).select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
});

module.exports = router;
