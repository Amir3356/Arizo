import express from 'express';
import Joi from 'joi';
import pool from '../db.js';

const router = express.Router();

const contactSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  subject: Joi.string().max(150).allow('').optional(),
  message: Joi.string().min(5).max(1000).required()
});

router.post('/', async (req, res) => {
  const { error, value } = contactSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      status: 'fail',
      message: 'Validation error',
      details: error.details.map((d) => ({ field: d.path.join('.'), message: d.message }))
    });
  }

  const { name, email, subject, message } = value;

  try {
    const query = `INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)`;
    const [result] = await pool.execute(query, [name, email, subject, message]);

    return res.status(201).json({
      status: 'success',
      message: 'Contact request received',
      contactId: result.insertId
    });
  } catch (err) {
    console.error('DB insert error', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

export default router;
