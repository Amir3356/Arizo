import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Get all portfolio entries
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM portfolio_projects ORDER BY updated_at DESC, id DESC');
    return res.json({ status: 'ok', data: rows });
  } catch (err) {
    console.error('Portfolio fetch error:', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

// Replace all portfolio entries (bulk deploy from admin)
router.post('/reload', async (req, res) => {
  const { websites, erp } = req.body;
  if (!Array.isArray(websites) || !Array.isArray(erp)) {
    return res.status(400).json({ status: 'fail', message: 'websites and erp arrays are required' });
  }

  const entries = [
    ...websites.map((item) => ({ ...item, type: 'web' })),
    ...erp.map((item) => ({ ...item, type: 'erp' })),
  ];

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    await conn.query('DELETE FROM portfolio_projects');

    for (const item of entries) {
      await conn.execute(
        'INSERT INTO portfolio_projects (type, name, url, description, image, icon, features) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
          item.type,
          item.name || null,
          item.url || null,
          item.description || null,
          item.image || null,
          item.icon || null,
          JSON.stringify(item.features || []),
        ]
      );
    }

    await conn.commit();
    const [rows] = await conn.query('SELECT * FROM portfolio_projects ORDER BY updated_at DESC, id DESC');
    return res.json({ status: 'ok', data: rows });
  } catch (err) {
    await conn.rollback();
    console.error('Portfolio reload error:', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  } finally {
    conn.release();
  }
});

// Add new portfolio entry
router.post('/', async (req, res) => {
  const { type, name, url, description, image, icon, features } = req.body;

  if (!type || !name || !description) {
    return res.status(400).json({ status: 'fail', message: 'type, name, description are required' });
  }

  const featuresJson = Array.isArray(features) ? JSON.stringify(features) : '[]';

  try {
    const [result] = await pool.execute(
      'INSERT INTO portfolio_projects (type, name, url, description, image, icon, features) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [type, name, url || null, description, image || null, icon || null, featuresJson]
    );

    const [rows] = await pool.query('SELECT * FROM portfolio_projects WHERE id = ?', [result.insertId]);
    return res.status(201).json({ status: 'success', data: rows[0] });
  } catch (err) {
    console.error('Portfolio insert error:', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

// Update portfolio entry
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { type, name, url, description, image, icon, features } = req.body;

  if (!type || !name || !description) {
    return res.status(400).json({ status: 'fail', message: 'type, name, description are required' });
  }

  const featuresJson = Array.isArray(features) ? JSON.stringify(features) : '[]';

  try {
    await pool.execute(
      'UPDATE portfolio_projects SET type = ?, name = ?, url = ?, description = ?, image = ?, icon = ?, features = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [type, name, url || null, description, image || null, icon || null, featuresJson, id]
    );

    const [rows] = await pool.query('SELECT * FROM portfolio_projects WHERE id = ?', [id]);
    return res.json({ status: 'success', data: rows[0] });
  } catch (err) {
    console.error('Portfolio update error:', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

// Delete portfolio entry
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.execute('DELETE FROM portfolio_projects WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ status: 'fail', message: 'Portfolio entry not found' });
    }
    return res.json({ status: 'success', message: 'Deleted' });
  } catch (err) {
    console.error('Portfolio delete error:', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

export default router;
