USE ecys_db;

CREATE TABLE IF NOT EXISTS cursos (
    id INT PRIMARY KEY,
    nombre_curso VARCHAR(200) NOT NULL,
    profesor VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS cursos_aprobados (
    id_registro INT AUTO_INCREMENT PRIMARY KEY,
    cui_usuario VARCHAR(13),
    id_curso INT NOT NULL,

    FOREIGN KEY (cui_usuario)
        REFERENCES usuarios(cui),

    FOREIGN KEY (id_curso)
        REFERENCES cursos(id),

    UNIQUE(cui_usuario, id_curso)
);