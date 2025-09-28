const express = require("express");
const Answer = require("../models/Answer");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, async (req, res) => {
    try {
        const {exam, question, answer} = req.body;
        if(!exam || !question || !answer)
            return res.status(400).json({message: "All fields are required"});

        const newAnswer = new Answer({
            exam, question, student:req.user.id, answer
        });

        await newAnswer.save();
        res.status(201).json({message: "Answer submitted successfully", newAnswer});
    }
    catch(err) {
        res.status(500).json({error: err.message});
    }
});

router.get("/:examId", auth, async (req, res) => {
    try {
        const answers = await Answer.find({exam: req.params.examId})
            .populate("student", "name email")
            .populate("question", "text type options");

        res.json(answers);
    }
    catch(err) {
        res.status(500).json({error: err.message});
    }
});

module.exports = router;