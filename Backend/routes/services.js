const express = require('express');
const pool = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // On sélectionne explicitement les nouveaux champs
    const [rows] = await pool.query(`
      SELECT 
        id, 
        name, 
        available, 
        created_at, 
        duration, 
        price, 
        requires_prescription 
      FROM services
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;