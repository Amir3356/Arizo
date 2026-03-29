import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import contactRouter from './routes/contact.js';
import portfolioRouter from './routes/portfolio.js';
import adminRouter from './routes/admin.js';
import pool from './db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed!'));
  }
});

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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

// File upload endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ status: 'fail', message: 'No file uploaded' });
  }
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ status: 'ok', imageUrl });
});

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
