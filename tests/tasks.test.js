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

    let createdId;

    it('GET /tasks - returns a list', async () => {
        const res = await request(app).get('/tasks');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('GET /tasks?search= - filters by title', async () => {
        const res = await request(app).get('/tasks?search=Test');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('POST /tasks - creates a new task', async () => {
        const res = await request(app)
            .post('/tasks')
            .send({ title: 'Test task', priority: 'high' });
        expect(res.statusCode).toBe(201);
        expect(res.body.title).toBe('Test task');
        createdId = res.body.id;
    });

    it('POST /tasks - fails without title', async () => {
        const res = await request(app)
            .post('/tasks')
            .send({ priority: 'low' });
        expect(res.statusCode).toBe(400);
    });

    it('PATCH /tasks/:id - updates a task', async () => {
        const res = await request(app)
            .patch(`/tasks/${createdId}`)
            .send({ done: true });
        expect(res.statusCode).toBe(200);
        expect(res.body.done).toBe(true);
    });

    it('DELETE /tasks/:id - deletes a task', async () => {
        const res = await request(app).delete(`/tasks/${createdId}`);
        expect(res.statusCode).toBe(204);
    });

    it('GET /tasks/:id - returns 404 for deleted task', async () => {
        const res = await request(app).get(`/tasks/${createdId}`);
        expect(res.statusCode).toBe(404);
    });

});