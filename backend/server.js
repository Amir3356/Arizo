import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRouter from './routes/contact.js';
import portfolioRouter from './routes/portfolio.js';
import adminRouter from './routes/admin.js';
import pool from './db.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Backend contact form is running' });
});

app.get('/api/health', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT 1 + 1 AS result');
    if (rows[0]?.result === 2) {
      return res.json({ status: 'ok', app: 'express', db: 'connected' });
    }
    return res.status(500).json({ status: 'fail', db: 'unexpected result' });
  } catch (err) {
    console.error('DB health check failed:', err);
    return res.status(500).json({ status: 'fail', db: 'unconnected', error: err.message });
  }
});

app.use('/api/contact', contactRouter);
app.use('/api/portfolio', portfolioRouter);
app.use('/api/admin', adminRouter);

app.use((req, res) => {
  res.status(404).json({ status: 'fail', message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ status: 'error', message: 'Internal server error' });
});

const startServer = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('MySQL connected successfully');
    connection.release();
  } catch (err) {
    console.error('MySQL connection failed:', err.message);
    process.exit(1);
  }

  app.listen(port, () => {
    console.log(`Express server listening on http://localhost:${port}`);
    console.log('Backend is up: Express and MySQL connected successfully');
  });
};

startServer();
