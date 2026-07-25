const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const savedArraysRoutes = require("./routes/savedArrays");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/saved-arrays", savedArraysRoutes);

app.get("/", (req, res) => {
  res.json({ status: "DSA Visualizer API running" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});