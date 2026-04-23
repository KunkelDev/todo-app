require('dotenv').config();
/** @type {import('pg').Pool} */
const pool = require('./db');

(async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS tasks (
            id         SERIAL PRIMARY KEY,
            title      TEXT    NOT NULL,
            done       BOOLEAN NOT NULL DEFAULT false,
            priority   TEXT    NOT NULL DEFAULT 'medium',
            created_at TIMESTAMP DEFAULT NOW()
        )
    `);
    console.log('Table tasks created');
    await pool.end();
    process.exit();
})();