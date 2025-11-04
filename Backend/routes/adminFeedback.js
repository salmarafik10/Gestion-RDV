const express = require('express');
const pool = require('../db');
const router = express.Router();

// GET /api/admin/feedback?page=1&limit=20
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const offset = (page - 1) * limit;
  const [rows] = await pool.query(
    `SELECT id, comment, rating, created_at, is_public FROM feedback ORDER BY created_at DESC LIMIT ? OFFSET ?`,
    [limit, offset]
  );
  const [countRows] = await pool.query('SELECT COUNT(*) as total FROM feedback');
  res.json({ feedbacks: rows, total: countRows[0].total });
});

// PATCH /api/admin/feedback/:id/public
router.patch('/:id/public', async (req, res) => {
  const { is_public } = req.body;
  await pool.query('UPDATE feedback SET is_public = ? WHERE id = ?', [is_public, req.params.id]);
  res.json({ message: 'Feedback updated' });
});

// DELETE /api/admin/feedback/:id
router.delete('/:id', async (req, res) => {
  await pool.query('DELETE FROM feedback WHERE id = ?', [req.params.id]);
  res.json({ message: 'Feedback deleted' });
});

module.exports = router;