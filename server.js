const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 5000; // You can also use process.env.PORT for production environments

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Atlas Connection String
const mongoURI = "mongodb+srv://saipranayt314:Qsc7tU8HXvDTzGPk@cluster0.bwuxw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB Atlas");
});

mongoose.connection.on("error", (err) => {
  console.log("MongoDB connection error:", err);
});

// Define Mood Schema and Model
const moodSchema = new mongoose.Schema({
  image: String,
  label: String,
  note: String,
  date: String,
});

// Add a virtual field `id` if you want a clean identifier
moodSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Add the virtual field to the response
moodSchema.set("toJSON", {
  virtuals: true,
});

const Mood = mongoose.model("Mood", moodSchema);

// API Routes

// Get all moods (for history)
app.get("/api/moods", async (req, res) => {
  try {
    const moods = await Mood.find();
    res.json(moods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Save a new mood entry
app.post("/api/mood", async (req, res) => {
  const { image, label, note, date } = req.body;

  const newMood = new Mood({ image, label, note, date });

  try {
    await newMood.save();
    res.status(201).json(newMood); // This will include the _id automatically
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
