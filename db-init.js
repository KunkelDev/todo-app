const pool = require('./db');

async function init() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS tasks (
                                             id         SERIAL PRIMARY KEY,
                                             title      TEXT    NOT NULL,
                                             done       BOOLEAN NOT NULL DEFAULT false,
                                             priority   TEXT    NOT NULL DEFAULT 'medium',
                                             created_at TIMESTAMP DEFAULT NOW()
            )
    `);
    console.log('Tabelle todos erstellt');
    process.exit();
}

init();