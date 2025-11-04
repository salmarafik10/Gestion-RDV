const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads/prescriptions', express.static('uploads/prescriptions'));

const pool = require('./db');

// Test de connexion à la base
app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS solution');
    res.json({ solution: rows[0].solution });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/', (req, res) => {
  res.send('API Gestion RDV');
});

// Ajoute ici :
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const feedbackRoutes = require('./routes/feedback');
app.use('/api/feedback', feedbackRoutes);

const servicesRoutes = require('./routes/services');
app.use('/api/services', servicesRoutes);

const appointmentsRoutes = require('./routes/appointments');
app.use('/api/appointments', appointmentsRoutes);

const profileRoutes = require('./routes/profile');
app.use('/api/profile', profileRoutes);

const adminStatsRoutes = require('./routes/adminStats');
app.use('/api/admin/stats', adminStatsRoutes);

const adminServicesRoutes = require('./routes/adminServices');
app.use('/api/admin/services', adminServicesRoutes);

const adminClientsRoutes = require('./routes/adminClients');
app.use('/api/admin/clients', adminClientsRoutes);

const adminAppointmentsRoutes = require('./routes/adminAppointments');
app.use('/api/admin/appointments', adminAppointmentsRoutes);

const adminFeedbackRoutes = require('./routes/adminFeedback');
app.use('/api/admin/feedback', adminFeedbackRoutes);

const downloadRoutes = require('./routes/download');
app.use('/api', downloadRoutes);

// ... autres routes éventuelles ...

// Test route (optionnel)
app.get('/', (req, res) => {
  res.send('API Gestion RDV');
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


