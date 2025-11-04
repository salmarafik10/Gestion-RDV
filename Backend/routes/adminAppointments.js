const express = require('express');
const pool = require('../db');
const router = express.Router();

// GET /api/admin/appointments?page=1&limit=20
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const offset = (page - 1) * limit;

  const [rows] = await pool.query(
    `SELECT a.id, c.fullname as client, s.name as service, a.appointment_date, a.appointment_time_slot, a.status, a.prescription_file
     FROM appointments a
     JOIN clients c ON a.client_id = c.id
     JOIN services s ON a.service_id = s.id
     ORDER BY a.appointment_date DESC, a.appointment_time_slot DESC
     LIMIT ? OFFSET ?`,
    [limit, offset]
  );
  const [countRows] = await pool.query('SELECT COUNT(*) as total FROM appointments');
  res.json({ appointments: rows, total: countRows[0].total });
});

// PATCH /api/admin/appointments/:id/status
router.patch('/:id/status', async (req, res) => {
  const { status } = req.body;
  await pool.query('UPDATE appointments SET status = ? WHERE id = ?', [status, req.params.id]);
  res.json({ message: 'Status updated' });
});

module.exports = router;