const express = require("express");
const pool = require("../db");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// Get all saved arrays for the logged-in user
router.get("/", requireAuth, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, values, created_at FROM saved_arrays WHERE user_id = $1 ORDER BY created_at DESC",
      [req.userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Save a new array
router.post("/", requireAuth, async (req, res) => {
  const { name, values } = req.body;
  if (!name || !Array.isArray(values)) {
    return res.status(400).json({ error: "name and values[] required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO saved_arrays (user_id, name, values) VALUES ($1, $2, $3) RETURNING id, name, values, created_at",
      [req.userId, name, values]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete a saved array
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    await pool.query(
      "DELETE FROM saved_arrays WHERE id = $1 AND user_id = $2",
      [req.params.id, req.userId]
    );
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;