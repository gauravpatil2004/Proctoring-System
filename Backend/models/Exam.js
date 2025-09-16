const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
    title: {type: String, required: true},
    date: {type: Date, required: true},
    duration: {type: Number, required: true},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
}, {timestamps: true});

module.exports = mongoose.model("Exam", examSchema);