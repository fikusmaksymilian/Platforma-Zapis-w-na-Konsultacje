const express = require('express');
const { Pool } = require('pg');
const app = express();
app.use(express.json());
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool.on('error', (err) => console.log('Błąd bazy:', err.message));

app.get('/health', async (req, res) =>{
  await pool.query('SELECT 1');
  res.json({ status: 'ok' });
});

app.get('/api/prowadzacy', async (req, res) =>{
  const wynik = await pool.query('SELECT * FROM prowadzacy');
  res.json(wynik.rows);
});

app.get('/api/prowadzacy/:id', async (req, res) =>{
  const wynik = await pool.query('SELECT * FROM prowadzacy WHERE id = $1', [req.params.id]);
  if (wynik.rows.length === 0) {
    return res.status(404).json({ blad:'Nie ma prowadzacego o takim id'});
  }
  res.json(wynik.rows[0]);
});

app.post('/api/prowadzacy', async (req, res) =>{
  const dane = req.body || {};
  if (!dane.imie || !dane.nazwisko){
    return res.status(400).json({ blad:'Podaj imie i nazwisko'});
  }
  const wynik = await pool.query(
    'INSERT INTO prowadzacy (imie, nazwisko) VALUES ($1, $2) RETURNING *',
    [dane.imie, dane.nazwisko]
  );
  res.status(201).json(wynik.rows[0]);
});

app.delete('/api/prowadzacy/:id', async (req, res) =>{
  const wynik = await pool.query('DELETE FROM prowadzacy WHERE id = $1 RETURNING *', [req.params.id]);
  if (wynik.rows.length === 0){
    return res.status(404).json({ blad:'Nie ma prowadzacego o takim id'});
  }
  res.json({ usunieto: wynik.rows[0] });
});

app.get('/api/terminy', async (req, res) => {
  const wynik = await pool.query(
    'SELECT t.id, p.imie, p.nazwisko, t.dzien, t.godzina, t.sala ' +
    'FROM terminy t JOIN prowadzacy p ON p.id = t.prowadzacy_id ORDER BY t.id'
  );
  res.json(wynik.rows);
});

app.listen(process.env.PORT, () => console.log('Backend dziala na porcie ' + process.env.PORT));
