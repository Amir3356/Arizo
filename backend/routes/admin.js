import express from 'express';
import bcrypt from 'bcrypt';
import pool from '../db.js';
import Joi from 'joi';

const router = express.Router();

const loginSchema = Joi.object({
  username: Joi.string().min(1).max(50).required(),
  password: Joi.string().min(1).required(),
});

// POST /api/admin/login
router.post('/login', async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    const { username, password } = value;

    const [rows] = await pool.execute(
      'SELECT id, password FROM admin_users WHERE username = ?',
      [username]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const { id, password: dbPassword } = rows[0];

    const isValid = await bcrypt.compare(password, dbPassword);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // For simplicity, just return success. In production, use JWT or session.
    res.json({ success: true, message: 'Login successful' });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;