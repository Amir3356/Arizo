import bcrypt from 'bcrypt';
import pool from './db.js';

const username = 'admin';
const password = 'admin123'; // Change this to desired password

async function insertAdmin() {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.execute(
      'INSERT INTO admin_users (username, password) VALUES (?, ?)',
      [username, hashedPassword]
    );
    console.log('Admin user inserted successfully');
  } catch (err) {
    console.error('Error inserting admin:', err);
  } finally {
    process.exit();
  }
}

insertAdmin();