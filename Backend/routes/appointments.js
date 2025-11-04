const express = require('express');
const pool = require('../db');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Crée le dossier d'upload s'il n'existe pas
const uploadDir = 'uploads/prescriptions/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage pour renommer le fichier avec le nom du client
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // On suppose que le frontend envoie aussi le fullname dans le formData
    let fullname = req.body.fullname || "ordonnance";
    fullname = fullname.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_]/g, "");
    const ext = path.extname(file.originalname);
    cb(null, `${fullname}${ext}`);
  }
});
const upload = multer({ storage });

router.post('/', upload.single('prescription'), async (req, res) => {
  const { client_id, service_id, appointment_date, time_slot, fullname } = req.body;
  const prescriptionFile = req.file ? req.file.filename : null;
  try {
    await pool.query(
      'INSERT INTO appointments (client_id, service_id, appointment_date, appointment_time_slot, prescription_file) VALUES (?, ?, ?, ?, ?)',
      [client_id, service_id, appointment_date, time_slot, prescriptionFile]
    );
    res.status(201).json({ message: 'Appointment booked successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Middleware d'authentification (si pas déjà présent dans ce fichier)
const jwt = require('jsonwebtoken');
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

// Historique des rendez-vous du client connecté
router.get('/my', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const [rows] = await pool.query(
      `SELECT a.*, s.name as service_name
       FROM appointments a
       JOIN services s ON a.service_id = s.id
       WHERE a.client_id = ?
       ORDER BY a.created_at DESC`,
      [userId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Annuler un rendez-vous
router.patch('/:id/cancel', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const appointmentId = req.params.id;
  try {
    // Vérifier que le rendez-vous appartient à l'utilisateur
    const [rows] = await pool.query('SELECT * FROM appointments WHERE id = ? AND client_id = ?', [appointmentId, userId]);
    if (rows.length === 0) return res.status(404).json({ message: 'Appointment not found' });
    // Mettre à jour le statut
    await pool.query('UPDATE appointments SET status = ? WHERE id = ?', ['cancelled', appointmentId]);
    res.json({ message: 'Appointment cancelled' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;