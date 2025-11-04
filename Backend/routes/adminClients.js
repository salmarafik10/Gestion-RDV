const express = require('express');
const pool = require('../db');
const router = express.Router();

// GET /api/admin/clients?page=1&limit=20&search=nom
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const offset = (page - 1) * limit;
  const search = req.query.search ? `%${req.query.search}%` : '%';

  // Récupère les clients + nombre de rendez-vous
  const [rows] = await pool.query(
    `SELECT c.id, c.fullname, c.email, c.phone, 
            COUNT(a.id) as appointments
     FROM clients c
     LEFT JOIN appointments a ON a.client_id = c.id
     WHERE c.fullname LIKE ?
     GROUP BY c.id
     ORDER BY c.fullname
     LIMIT ? OFFSET ?`,
    [search, limit, offset]
  );
  const [countRows] = await pool.query(
    `SELECT COUNT(*) as total FROM clients WHERE fullname LIKE ?`, [search]
  );
  res.json({ clients: rows, total: countRows[0].total });
});

module.exports = router;