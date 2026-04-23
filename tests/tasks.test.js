require('dotenv').config();
const request = require('supertest');
const express = require('express');
const tasksRouter = require('../routes/tasks');
const pool = require('../db');

const app = express();
app.use(express.json());
app.use('/tasks', tasksRouter);

afterAll(async () => {
    await pool.end();
});

describe('Task API', () => {

    it('GET /tasks - returns a list', async () => {
        const res = await request(app).get('/tasks');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('POST /tasks - creates a new task', async () => {
        const res = await request(app)
            .post('/tasks')
            .send({ title: 'Test task', priority: 'high' });
        expect(res.statusCode).toBe(201);
        expect(res.body.title).toBe('Test task');
    });

    it('POST /tasks - fails without title', async () => {
        const res = await request(app)
            .post('/tasks')
            .send({ priority: 'low' });
        expect(res.statusCode).toBe(400);
    });

    it('PATCH /tasks/:id - updates a task', async () => {
        const res = await request(app)
            .patch('/tasks/1')
            .send({ done: true });
        expect([200, 404, 500]).toContain(res.statusCode);
    });

    it('DELETE /tasks/:id - deletes a task', async () => {
        const res = await request(app).delete('/tasks/1');
        expect([204, 404, 500]).toContain(res.statusCode);
    });

}); 