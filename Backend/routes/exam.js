const express = require("express");
const Exam = require("../models/Exam");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, async (req, res) => {
    try {
        const {title, date, duration} = req.body;

        const exam = new Exam({
            title, 
            date,
            duration,
            createdBy: req.user.id
        });

        await exam.save();
        res.status(201).json({message: "Exam created successfully", exam});
    }
    catch(err) {
        res.status(500).json({error: err.message});
    }
});

router.get("/", auth, async (req, res) => {
    try {
        const exams = await Exam.find().populate("createdBy", "name email role");
        res.json(exams);
    } 
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/:id", auth, async (req, res) => {
    try {
        const exam = await Exam.findById(req.params.id).populate("createdBy", "name email role");
        if(!exam) 
            return res.status(404).json({message: "Exam not found"});
        res.json(exam);
    } 
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put("/:id", auth, async (req, res) => {
    try {
        const {title, date, duration} = req.body;

        let exam = await Exam.findById(req.params.id);
        if(!exam)
            return res.status(404).json({message: "Exam not found"});

        exam.title = title || exam.title;
        exam.date = date || exam.date;
        exam.duration = duration || exam.duration;

        await exam.save();
        res.json({message: "Exam updated succesfully", exam});
    }
    catch(err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

router.delete("/:id", auth, async (req, res) => {
    try {
        const exam = await Exam.findById(req.params.id);
        if(!exam)
            return res.status(404).json({message: "Exam not found"});

        await exam.deleteOne();
        res.json({message: "Exam deleted successfully"});
    }
    catch(err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;