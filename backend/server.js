const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const perfilRoutes = require('./routes/perfilRoutes');
const cursosRoutes = require('./routes/cursosRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas base
app.use('/api/auth', authRoutes);
app.use('/api/perfiles', perfilRoutes);
app.use('/api/cursos', cursosRoutes);

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ status: 'API funcionando correctamente' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor Backend corriendo en el puerto ${PORT}`);
});
