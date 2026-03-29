import pool from './db.js';

async function removeIconColumn() {
  try {
    // Check if icon column exists
    const [columns] = await pool.execute(`
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = DATABASE() 
      AND TABLE_NAME = 'portfolio_projects' 
      AND COLUMN_NAME = 'icon'
    `);

    if (columns.length > 0) {
      // Remove icon column
      await pool.execute('ALTER TABLE portfolio_projects DROP COLUMN icon');
      console.log('Removed icon column from portfolio_projects table');
    } else {
      console.log('Icon column does not exist');
    }

    process.exit(0);
  } catch (err) {
    console.error('Error removing icon column:', err);
    process.exit(1);
  }
}

removeIconColumn();
