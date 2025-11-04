const express = require('express');
const pool = require('../db');
const router = express.Router();

// Rendez-vous aujourd'hui
router.get('/appointments-today', async (req, res) => {
  const [rows] = await pool.query(
    "SELECT COUNT(*) as count FROM appointments WHERE DATE(appointment_date) = CURDATE() AND status = 'confirmed'"
  );
  res.json({ count: rows[0].count });
});

// Clients aujourd'hui
router.get('/customers-today', async (req, res) => {
  const [rows] = await pool.query(
    "SELECT COUNT(*) as count FROM clients WHERE DATE(created_at) = CURDATE()"
  );
  res.json({ count: rows[0].count });
});

// Rendez-vous par mois (12 derniers mois)
router.get('/appointments-per-month', async (req, res) => {
  const [rows] = await pool.query(`
    SELECT DATE_FORMAT( appointment_date, '%b %Y') as month, COUNT(*) as count
    FROM appointments
    WHERE  appointment_date >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
    GROUP BY month
    ORDER BY  appointment_date
  `);
  res.json(rows);
});

// Feedback par rating
router.get('/feedback', async (req, res) => {
  const [rows] = await pool.query(`
    SELECT rating, COUNT(*) as count
    FROM feedback
    GROUP BY rating
    ORDER BY rating
  `);
  // Retourne un tableau [nb1, nb2, nb3, nb4, nb5]
  const stats = [0, 0, 0, 0, 0];
  rows.forEach(r => {
    stats[r.rating - 1] = r.count;
  });
  res.json(stats);
});

module.exports = router;