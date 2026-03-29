import bcrypt from 'bcrypt';
import pool from './db.js';

const username = 'admin';
const password = '123';

async function insertAdmin() {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Delete existing admin if any
    await pool.execute('DELETE FROM admin_users WHERE username = ?', [username]);
    
    // Insert new admin
    await pool.execute(
      'INSERT INTO admin_users (username, password) VALUES (?, ?)',
      [username, hashedPassword]
    );
    console.log('Admin user created successfully');

    console.log('Username:', username);
    console.log('Password:', password);
  } catch (err) {
    console.error('Error inserting admin:', err.message);
  } finally {
    process.exit();
  }
}

insertAdmin();
