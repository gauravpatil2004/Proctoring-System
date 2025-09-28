const express = require("express");
const Result = require("../models/Result");
const auth = require("../middleware/auth");
const Answer = require("../models/Answer");
const Question = require("../models/Question");

const router = express.Router();

router.post("/submi/:examId", auth, async (req, res) => {
    try {
        const examId = req.params.examId;
        const studenId = req.user.id;

        const questions = await Question.find({exam: examId});
        const total = questions.length;
        const answers = await Answer.find({exam: examId, student: studentId});
        let score = 0;
        answers.forEach(ans => {
            const q = questions.find(q => q._id.toString() === ans.question.toString());
            if(q && ans.answer === q.correctAnswer)
                score += 1;
        });

        const result = new result({exam: examId, student: studentId, score, total});
        await result.save();

        res.json({message: "Result submitted successfully", result});
    }
    catch(err) {
        res.status(500).json({error: err.message});
    }
});

router.get("/exam:id", auth, async (req, res) => {
    try {
        const results = await Result.find({exam: req.params.examId})
            .populate("student", "name email");
        res.json(results);
    }
    catch(err) {
        res.status(500).json({error: err.message});
    }
});

router.get("/student/:examId", auth, async (req, res) => {
    try {
        const result = await Result.findOne({exam: req.params.examId, student: req.user.id});
        res.json(result);
    }
    catch(err) {
        res.status(500).json({error: err.message});
    }
});

module.exports = router;