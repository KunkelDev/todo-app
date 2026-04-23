const express = require('express');
const pool = require('./db');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({
            message: 'Datenbankverbindung erfolgreich!',
            time: result.rows[0].now,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server laeuft auf http://localhost:${PORT}`);
});