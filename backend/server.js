const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const pdfRoutes = require('./routes/pdfRoutes');
const chatRoutes = require('./routes/chatRoutes');

dotenv.config();

const app = express();

// Allow CORS and JSON
app.use(cors());
app.use(express.json());

// ✅ Serve uploaded PDFs from /uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ API Routes
app.use('/api/pdf', pdfRoutes);
app.use('/api/chat', chatRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
