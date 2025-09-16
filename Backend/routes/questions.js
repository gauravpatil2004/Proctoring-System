const express = require("express");
const Question = require("../models/Question");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, s=async (req, res) => {
    try {
        const {exam, text, options, correctAnswer, marks} = req.body;
        const question = new Question({exam, text, options, correctAnswer, marks});
        await question.save();
        res.status(201).json({message: "Question created successfully", question});
    }
    catch(err) {
        res.status(500).json({error: err.message});
    }
});

router.get("/:examId", auth, async (req, res) => {
    try {
        const questions = await Question.find({exam: req.params.examId});
        res.json(questions);
    }
    catch(err) {
        res.status(500).json({error: err.message});
    }
});

router.put("/:id", auth, async (req, res) => {
    try {
        const question = await Question.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json({message: "Question updated successfully", question});
    }
    catch(err) {
        res.status(500).json({error: err.message});
    }
});

router.delete("/:id", auth, async (req, res) => {
    try {
        await Question.findByIdAndDelete(req.params.id);
        res.json({message: "Question deleted successfully"});
    }
    catch(err) {
        res.status(500).json({error: err.message});
    }
});

module.exports = router;