const express = require("express");
const  bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/register", async(req, res) => {
    try {
        const {name, email, password, role} = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser)
            return res.status(400).json({message: "User already exists"});

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({name, email, password: hashedPassword, role});
        await newUser.save();

        res.status(201).json({message: "User registered successfully"});
    }
    catch(err) {
        res.status(500).json({error: err.message});
    }
});

router.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user)
            return res.status(400).json({message: "Invalid credentials"});
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)
            return res.status(400).json({message: "Password is incorrect"});

        const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: "1h"});

        res.json({token, user: {id: user._id, name: user.name, role: user.role}});
    }
    catch(err) {
        res.status(500).json({error: err.message});
    }
});

router.get("/profile", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    }
    catch(err) {
        res.status(500).json({error: err.message});
    }
});

module.exports = router;