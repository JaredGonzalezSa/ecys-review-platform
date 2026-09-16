const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const publicacionesRoutes = require('./routes/publicacionesRoutes');
const comentariosRoutes = require('./routes/comentariosRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas base
app.use('/api/auth', authRoutes);
app.use('/api/publicaciones', publicacionesRoutes); // POST/GET publicaciones
app.use('/api/publicaciones', comentariosRoutes);   // GET /:id/comentarios (comparte prefijo)
app.use('/api/comentarios', comentariosRoutes);     // POST comentarios

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ status: 'API funcionando correctamente' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor Backend corriendo en el puerto ${PORT}`);
});