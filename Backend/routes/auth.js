const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const router = express.Router();

// Inscription client
router.post('/register', async (req, res) => {
  const { fullname, email, phone, password } = req.body;
  try {
    // Vérifier si l'email existe déjà
    const [rows] = await pool.query('SELECT * FROM clients WHERE email = ?', [email]);
    if (rows.length > 0) {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }
    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
    // Insérer le client
    await pool.query(
      'INSERT INTO clients (fullname, email, phone, password) VALUES (?, ?, ?, ?)',
      [fullname, email, phone, hashedPassword]
    );
    res.status(201).json({ message: 'Inscription réussie' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Connexion (admin ou client)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Vérifier si c'est un admin
    const [adminRows] = await pool.query('SELECT * FROM admins WHERE email = ?', [email]);
    if (adminRows.length > 0) {
      const admin = adminRows[0];
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
      }
      const token = jwt.sign({ id: admin.id, email: admin.email, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });
      return res.json({ token, user: { id: admin.id, email: admin.email, role: 'admin' } });
    }
    // Sinon, vérifier si c'est un client
    const [clientRows] = await pool.query('SELECT * FROM clients WHERE email = ?', [email]);
    if (clientRows.length === 0) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }
    const client = clientRows[0];
    const isMatch = await bcrypt.compare(password, client.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }
    const token = jwt.sign({ id: client.id, email: client.email, role: 'client' }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: client.id, fullname: client.fullname, email: client.email, phone: client.phone, role: 'client' } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Middleware d'authentification
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Route pour récupérer le profil du client connecté
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, fullname, email, phone FROM clients WHERE id = ?', [req.user.id]);
    if (rows.length === 0) return res.status(404).json({ message: "Client not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Route pour demander la réinitialisation
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  // Vérifie si l'email existe
  const [rows] = await pool.query('SELECT * FROM clients WHERE email = ?', [email]);
  if (rows.length === 0) {
    // Toujours répondre OK pour ne pas révéler si l'email existe
    return res.json({ message: "If this email exists, you will receive a reset link." });
  }
  // Génère un token
  const token = crypto.randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + 3600 * 1000); // 1h
  await pool.query('UPDATE clients SET reset_token = ?, reset_token_expires = ? WHERE email = ?', [token, expires, email]);

  // Envoie l'email
  const transporter = require('nodemailer').createTransport({
    service: 'gmail',
    auth: { user: 'rafiksalma092@gmail.com', pass: 'YOUR PASSWORD' }
  });
  const resetUrl = `http://localhost:3000/reset-password?token=${token}`;
  await transporter.sendMail({
    from: '"RDV" <rafiksalma092@gmail.com>',
    to: email,
    subject: "Réinitialisation de mot de passe",
    html: `<p>Cliquez ici pour réinitialiser votre mot de passe : <a href="${resetUrl}">${resetUrl}</a></p>`
  });
  res.json({ message: "If this email exists, you will receive a reset link." });
});

// Route pour réinitialiser le mot de passe
router.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;
  const [rows] = await pool.query(
    'SELECT * FROM clients WHERE reset_token = ? AND reset_token_expires > NOW()', [token]
  );
  if (rows.length === 0) return res.status(400).json({ message: "Invalid or expired token" });

  const hashed = await bcrypt.hash(password, 10);
  await pool.query(
    'UPDATE clients SET password = ?, reset_token = NULL, reset_token_expires = NULL WHERE id = ?',
    [hashed, rows[0].id]
  );
  res.json({ message: "Password updated" });
});

module.exports = router;
