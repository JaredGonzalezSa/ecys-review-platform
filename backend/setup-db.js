const mysql = require('mysql2/promise');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

async function setupDB() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      ssl: { rejectUnauthorized: true }
    });

    const sqlScript = fs.readFileSync(path.join(__dirname, '../database.sql'), 'utf-8');
    const statements = sqlScript.split(';').filter(stmt => stmt.trim() !== '');

    for (let stmt of statements) {
      if (stmt.trim().startsWith('--')) continue;
      console.log('Executing:', stmt.trim().substring(0, 50) + '...');
      await connection.query(stmt);
    }
    
    console.log('Database and tables created successfully!');
    await connection.end();
  } catch (error) {
    console.error('Error setting up DB:', error);
  }
}

setupDB();
