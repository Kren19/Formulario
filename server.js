const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Configuración de la conexión a MySQL (para producción)
const db = mysql.createConnection({
  host: 'tu-host-en-linea',  // Cambia esto por la dirección IP o el nombre de dominio del servidor en línea
  user: 'tu-usuario',
  password: 'tu-contraseña',
  database: 'comentariosdb' // Nombre de la base de datos creada en MySQL
});

// Conectar a la base de datos MySQL
db.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Middleware
app.use(cors());
app.use(express.json());

// Ruta para obtener comentarios
app.get('/comments', (req, res) => {
  const sql = 'SELECT * FROM comentarios';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Ruta para agregar un comentario
app.post('/comments', (req, res) => {
  const newComment = req.body;
  const sql = 'INSERT INTO comentarios SET ?';
  db.query(sql, newComment, (err, result) => {
    if (err) throw err;
    res.status(201).json(result);
  });
});

// Ruta para eliminar un comentario
app.delete('/comments/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM comentarios WHERE id = ?';
  db.query(sql, id, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
