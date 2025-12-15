require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const { router: authRoutes } = require('./auth');

const app = express();

/* =========================
   DATABASE (SQLite)
========================= */
const db = new sqlite3.Database('./database.db');

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )
`);

app.locals.db = db;

/* =========================
   MIDDLEWARES
========================= */
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

/* =========================
   ROUTES
========================= */
app.use('/auth', authRoutes);

/* =========================
   FRONTEND FALLBACK
========================= */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

/* =========================
   PORT (Render-safe)
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});
