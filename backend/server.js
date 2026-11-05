const express = require('express');
const { Pool } = require('pg');

const app = express();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
});

app.get('/api/prowadzacy', async (req, res) => {
  const wynik = await pool.query('SELECT * FROM prowadzacy');
  res.json(wynik.rows);
});

app.listen(3000, () => console.log('backend dziala na porcie 3000'));