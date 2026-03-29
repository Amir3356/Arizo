import pool from './db.js';

async function addIconColumn() {
  try {
    // Check if icon column exists
    const [columns] = await pool.execute(`
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = DATABASE() 
      AND TABLE_NAME = 'portfolio_projects' 
      AND COLUMN_NAME = 'icon'
    `);

    if (columns.length === 0) {
      // Add icon column
      await pool.execute('ALTER TABLE portfolio_projects ADD COLUMN icon VARCHAR(10) DEFAULT "📦"');
      console.log('Added icon column to portfolio_projects table');
    } else {
      console.log('Icon column already exists');
    }

    process.exit(0);
  } catch (err) {
    console.error('Error adding icon column:', err);
    process.exit(1);
  }
}

addIconColumn();
