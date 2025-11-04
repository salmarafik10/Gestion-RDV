const express = require('express');
const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware d'authentification
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied' });
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Modifier le profil
router.put('/', authenticateToken, async (req, res) => {
  const { fullname, email, password, newPassword } = req.body;
  const userId = req.user.id;
  try {
    // Vérifier le mot de passe actuel
    const [rows] = await pool.query('SELECT * FROM clients WHERE id = ?', [userId]);
    if (rows.length === 0) return res.status(404).json({ message: 'User not found' });
    const user = rows[0];
    if (password && !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Current password incorrect' });
    }
    // Mettre à jour
    let updateQuery = 'UPDATE clients SET fullname = ?, email = ?';
    let params = [fullname, email];
    if (newPassword) {
      const hashed = await bcrypt.hash(newPassword, 10);
      updateQuery += ', password = ?';
      params.push(hashed);
    }
    updateQuery += ' WHERE id = ?';
    params.push(userId);
    await pool.query(updateQuery, params);
    res.json({ message: 'Profile updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;