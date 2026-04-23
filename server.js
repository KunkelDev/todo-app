const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const tasksRouter = require('./routes/tasks');
const app = express();
const PORT = 3000;

app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routen
app.use('/tasks', tasksRouter);

app.listen(PORT, () => {
    console.log(`Server:    http://localhost:${PORT}`);
    console.log(`Swagger:   http://localhost:${PORT}/api-docs`);
});