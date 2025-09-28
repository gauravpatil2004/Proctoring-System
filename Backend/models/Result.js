const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
    exam: {type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true},
    student: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    score: {type: Number, required: true},
    total: {type: Number, required: true},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Result", resultSchema);