const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'SECRET_DEV';

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const db = req.app.locals.db;

  if (!username || !password)
    return res.status(400).json({ message: 'Champs manquants' });

  const hashed = await bcrypt.hash(password, 10);

  db.run(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, hashed],
    err => {
      if (err)
        return res.status(400).json({ message: 'Utilisateur déjà existant' });
      res.json({ message: 'Inscription réussie' });
    }
  );
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const db = req.app.locals.db;

  db.get(
    'SELECT * FROM users WHERE username = ?',
    [username],
    async (err, user) => {
      if (!user)
        return res.status(401).json({ message: 'Utilisateur introuvable' });

      const valid = await bcrypt.compare(password, user.password);
      if (!valid)
        return res.status(401).json({ message: 'Mot de passe incorrect' });

      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '2h' });
      res.json({ token });
    }
  );
});

module.exports = { router };
