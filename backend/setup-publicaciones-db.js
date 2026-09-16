const mysql = require('mysql2/promise');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

async function setupPublicacionesComentarios() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      ssl: { rejectUnauthorized: true },
    });

    console.log('Conectado a TiDB, ejecutando script...');

    const sqlScript = fs.readFileSync(
      path.join(__dirname, '../script_publicaciones_comentarios.sql'),
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

    console.log('\nScript ejecutado correctamente. Verificando tablas...\n');

    // Verificación: confirmar que las tablas realmente existen
    const [tablas] = await connection.query(
      `SHOW TABLES LIKE 'publicaciones'`
    );
    const [tablas2] = await connection.query(
      `SHOW TABLES LIKE 'comentarios'`
    );

    console.log('¿Existe tabla publicaciones?', tablas.length > 0 ? 'SÍ' : 'NO');
    console.log('¿Existe tabla comentarios?', tablas2.length > 0 ? 'SÍ' : 'NO');

    const [estructuraPub] = await connection.query('DESCRIBE publicaciones');
    console.log('\nEstructura de publicaciones:');
    console.table(estructuraPub);

    const [estructuraCom] = await connection.query('DESCRIBE comentarios');
    console.log('\nEstructura de comentarios:');
    console.table(estructuraCom);

    await connection.end();
  } catch (error) {
    console.error('Error al ejecutar el script:', error.message);
  }
}

setupPublicacionesComentarios();