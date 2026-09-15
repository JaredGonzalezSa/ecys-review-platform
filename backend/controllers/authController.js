const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Registro de Usuario
exports.register = async (req, res) => {
  try {
    const { cui, nombres, apellidos, email, password } = req.body;

    // Validación básica
    if (!cui || !nombres || !apellidos || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Verificar si el usuario ya existe
    const [existingUsers] = await db.query('SELECT * FROM usuarios WHERE cui = ? OR email = ?', [cui, email]);
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'El usuario o correo ya está registrado' });
    }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Insertar usuario
    await db.query(
      'INSERT INTO usuarios (cui, nombres, apellidos, email, password_hash) VALUES (?, ?, ?, ?, ?)',
      [cui, nombres, apellidos, email, passwordHash]
    );

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor al registrar usuario' });
  }
};

// Inicio de Sesión
exports.login = async (req, res) => {
  try {
    const { cui, password } = req.body;

    if (!cui || !password) {
      return res.status(400).json({ message: 'CUI y contraseña son obligatorios' });
    }

    // Buscar usuario
    const [users] = await db.query('SELECT * FROM usuarios WHERE cui = ?', [cui]);
    if (users.length === 0) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const user = users[0];

    // Verificar contraseña
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Generar Token JWT
    const token = jwt.sign(
      { cui: user.cui },
      process.env.JWT_SECRET,
      { expiresIn: '1d' } // Expira en 1 día
    );

    res.json({
      message: 'Inicio de sesión exitoso',
      token,
      user: {
        cui: user.cui,
        nombres: user.nombres,
        apellidos: user.apellidos,
        email: user.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor al iniciar sesión' });
  }
};

// Recuperar contraseña
exports.resetPassword = async (req, res) => {
  try {
    const { cui, email, newPassword } = req.body;

    if (!cui || !email || !newPassword) {
      return res.status(400).json({ message: 'CUI, correo y nueva contraseña son obligatorios' });
    }

    // Verificar que CUI y Email coincidan
    const [users] = await db.query('SELECT * FROM usuarios WHERE cui = ? AND email = ?', [cui, email]);
    if (users.length === 0) {
      return res.status(400).json({ message: 'Los datos no coinciden con ningún registro' });
    }

    // Encriptar nueva contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);

    // Actualizar base de datos
    await db.query('UPDATE usuarios SET password_hash = ? WHERE cui = ?', [passwordHash, cui]);

    res.json({ message: 'Contraseña actualizada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor al recuperar contraseña' });
  }
};
