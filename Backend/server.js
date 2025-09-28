require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const cors = require("cors");
const examRoutes = require("./routes/exam");
const questionRoutes = require("./routes/questions");
const answerRoutes = require("./routes/answer");
const resultRoutes = require("./routes/result");



const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/exams", examRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/answers", answerRoutes);
app.use("/api/results", resultRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("Backend is running");
});

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));