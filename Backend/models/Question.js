const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    exam: {type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true},
    text: {type: String, required: true},
    options: [{type: String, required:true}],
    correctAnswer: {type: String, required: true},
    marks: {type: Number, default: 1},
}, {timetamps: true});

module.exports = mongoose.model("Question", questionSchema);