const mysql = require('mysql2/promise');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

async function setupPerfilCursos() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      ssl: { rejectUnauthorized: true },
    });

    console.log('Conectado a TiDB, ejecutando script_perfil_cursos.sql...');

    const sqlScript = fs.readFileSync(
      path.join(__dirname, '../script_perfil_cursos.sql'),
      'utf-8'
    );

    const statements = sqlScript
      .split(';')
      .map((s) => s.trim())
      .filter((s) => s !== '' && !s.startsWith('--'));

    for (const stmt of statements) {
      console.log('Ejecutando:', stmt.substring(0, 60).replace(/\n/g, ' ') + '...');
      await connection.query(stmt);
    }

    console.log('\nScript ejecutado correctamente.\n');
    await connection.end();
  } catch (error) {
    console.error('Error al ejecutar el script:', error.message);
  }
}

setupPerfilCursos();
