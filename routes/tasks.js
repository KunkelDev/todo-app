const express = require('express');
const router = express.Router();
/** @type {import('pg').Pool} */
const pool = require('../db');

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     parameters:
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *         description: Filter by priority (low, medium, high)
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort by (created_at, priority)
 *     responses:
 *       200:
 *         description: List of tasks
 */
router.get('/', async (req, res) => {
    const { priority, sort } = req.query;
    let sqlQuery = 'SELECT * FROM tasks';
    const params = [];

    if (priority) {
        params.push(priority);
        sqlQuery += ` WHERE priority = $1`;
    }

    if (sort === 'created_at' || sort === 'priority') {
        sqlQuery += ` ORDER BY ${sort}`;
    }

    const result = await pool.query(sqlQuery, params);
    res.json(result.rows);
});

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get single task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A task
 *       404:
 *         description: Not found
 */
router.get('/:id', async (req, res) => {
    const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
});

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               priority:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task created
 */
router.post('/', async (req, res) => {
    const { title, priority = 'medium' } = req.body;
    if (!title) return res.status(400).json({ error: 'Title missing' });
    const result = await pool.query(
        'INSERT INTO tasks (title, priority) VALUES ($1, $2) RETURNING *',
        [title, priority]
    );
    res.status(201).json(result.rows[0]);
});

/**
 * @swagger
 * /tasks/{id}:
 *   patch:
 *     summary: Update a task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Updated task
 *       404:
 *         description: Not found
 */
router.patch('/:id', async (req, res) => {
    const { title, done, priority } = req.body;
    const result = await pool.query(
        `UPDATE tasks SET
                          title    = COALESCE($1, title),
                          done     = COALESCE($2, done),
                          priority = COALESCE($3, priority)
         WHERE id = $4 RETURNING *`,
        [title, done, priority, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
});

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Deleted
 */
router.delete('/:id', async (req, res) => {
    await pool.query('DELETE FROM tasks WHERE id = $1', [req.params.id]);
    res.status(204).send();
});

module.exports = router;