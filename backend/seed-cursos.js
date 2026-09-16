const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function seedCursos() {
    let connection;

    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            ssl: {
                rejectUnauthorized: true
            }
        });

        const rutaCursos = path.join(__dirname, '../cursos.json');
        const cursos = JSON.parse(fs.readFileSync(rutaCursos, 'utf8'));

        for (const curso of cursos) {
            await connection.execute(
                `INSERT INTO cursos (id, nombre_curso, profesor)
                 VALUES (?, ?, ?)
                 ON DUPLICATE KEY UPDATE
                 nombre_curso = VALUES(nombre_curso),
                 profesor = VALUES(profesor)`,
                [
                    curso.id,
                    curso.nombre_curso,
                    curso.profesor
                ]
            );
        }

        console.log(`Se insertaron/procesaron ${cursos.length} cursos correctamente.`);
    } catch (error) {
        console.error('Error ejecutando el seed:', error);
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

seedCursos();