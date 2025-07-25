const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { uploadPDF } = require('../controllers/pdfController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

router.post('/upload', upload.single('pdf'), uploadPDF);

module.exports = router;
