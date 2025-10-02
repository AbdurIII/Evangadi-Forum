const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const answerRoutes = require("./routes/answerRoute");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();
const port = 5500;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Welcome");
});

// Routes
const installRoutes = require("./routes/installRoute");
app.use("/", installRoutes);

const userRoutes = require("./routes/userRoute");
app.use("/api/users", userRoutes);

const questionRoutes = require("./routes/questionRoute");
app.use("/api", authMiddleware, questionRoutes);

app.use("/api", authMiddleware, answerRoutes);

// Start server
app.listen(port, (error) => {
  if (error) console.log(error.message);
  console.log(`Listening to :${port}`);
});
