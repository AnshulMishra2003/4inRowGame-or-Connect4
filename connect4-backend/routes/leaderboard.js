// routes/leaderboard.js

const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET /leaderboard — Return top 10 players sorted by win count
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT winner, COUNT(*) AS wins
      FROM games
      WHERE winner IS NOT NULL
      GROUP BY winner
      ORDER BY wins DESC
      LIMIT 10
    `);
    
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Leaderboard fetch error:", err.message);
    res.status(500).json({ error: "Leaderboard fetch failed" });
  }
});

module.exports = router;
