const express = require('express');
const pool = require('../db');
const router = express.Router();

// Pagination GET /api/services?page=1&limit=7
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 7;
  const offset = (page - 1) * limit;
  const [rows] = await pool.query(
    'SELECT * FROM services ORDER BY created_at DESC LIMIT ? OFFSET ?', [limit, offset]
  );
  const [countRows] = await pool.query('SELECT COUNT(*) as total FROM services');
  res.json({ services: rows, total: countRows[0].total });
});

// Ajouter un service
router.post('/', async (req, res) => {
  const { name, available, duration, price, requires_prescription } = req.body;
  await pool.query(
    'INSERT INTO services (name, available, duration, price, requires_prescription) VALUES (?, ?, ?, ?, ?)',
    [name, available, duration, price, requires_prescription]
  );
  res.status(201).json({ message: 'Service added' });
});

// Modifier un service
router.put('/:id', async (req, res) => {
  const { name, available, duration, price, requires_prescription } = req.body;
  await pool.query(
    'UPDATE services SET name = ?, available = ?, duration = ?, price = ?, requires_prescription = ? WHERE id = ?',
    [name, available, duration, price, requires_prescription, req.params.id]
  );
  res.json({ message: 'Service updated' });
});

// Supprimer un service
router.delete('/:id', async (req, res) => {
  await pool.query('DELETE FROM services WHERE id = ?', [req.params.id]);
  res.json({ message: 'Service deleted' });
});

module.exports = router;