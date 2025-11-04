const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/download/prescription/:filename', (req, res) => {
  const filename = req.params.filename;
  const file = path.join(__dirname, '../uploads/prescriptions/', filename);
  res.download(file, filename, (err) => {
    if (err) {
      res.status(404).json({ error: "File not found" });
    }
  });
});

module.exports = router;