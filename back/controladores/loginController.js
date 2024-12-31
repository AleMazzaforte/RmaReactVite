const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { conn } = require('../bd/bd');
require('dotenv').config();

const jwtSecret = process.env.SECRET_KEY;

module.exports = {
  postLogin: async (req, res) => {
    const { nombre, password } = req.body;

    try {
      const [results] = await conn.query('SELECT * FROM usuarios WHERE nombre = ?', [nombre]);

      if (results.length > 0) {
        const user = results[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          const token = jwt.sign({ id: user.id, nombre: user.nombre }, jwtSecret, { expiresIn: '8h' });
          res.json({ token });
        } else {
          res.status(401).json({ error: 'Contraseña incorrecta' });
        }
      } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Error del servidor' });
    }
  },

  authenticateToken: (req, res, next) => {
    const token = req.headers['authorization'];

    if (token) {
      jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
        
        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  }
};



