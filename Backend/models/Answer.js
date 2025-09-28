const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
    exam: {type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true},
    question: {type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true},
    student: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    answer: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Answer", answerSchema);