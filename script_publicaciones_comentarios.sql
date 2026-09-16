CREATE TABLE publicaciones (
  id_publicacion INT AUTO_INCREMENT PRIMARY KEY,
  cui_usuario VARCHAR(13) NOT NULL,
  tipo_referencia ENUM('CURSO','CATEDRATICO') NOT NULL,
  nombre_referencia VARCHAR(200) NOT NULL,
  mensaje TEXT NOT NULL,
  fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (cui_usuario) REFERENCES usuarios(cui)
);

CREATE TABLE comentarios (
  id_comentario INT AUTO_INCREMENT PRIMARY KEY,
  id_publicacion INT NOT NULL,
  cui_usuario VARCHAR(13) NOT NULL,
  mensaje TEXT NOT NULL,
  fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_publicacion) REFERENCES publicaciones(id_publicacion),
  FOREIGN KEY (cui_usuario) REFERENCES usuarios(cui)
);