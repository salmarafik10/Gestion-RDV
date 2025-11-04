const express = require('express');
const jwt = require('jsonwebtoken');
const pool = require('../db');

const router = express.Router();

// Middleware pour vérifier le token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Ajouter un feedback
router.post('/', authenticateToken, async (req, res) => {
  const { rating, comment } = req.body;
  const clientId = req.user.id;

  try {
    await pool.query(
      'INSERT INTO feedback (client_id, rating, comment) VALUES (?, ?, ?)',
      [clientId, rating, comment]
    );
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Récupérer tous les feedbacks (pour l'admin)
router.get('/public', async (req, res) => {
  const [rows] = await pool.query(
    `SELECT f.*, c.fullname FROM feedback f JOIN clients c ON f.client_id = c.id WHERE is_public = 1 ORDER BY created_at DESC`
  );
  res.json(rows);
});

module.exports = router;