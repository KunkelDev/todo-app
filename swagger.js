const swaggerJsdoc = require('swagger-jsdoc');

/** @type {import('swagger-jsdoc').Options} */
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Task API',
            version: '1.0.0',
            description: 'REST API for managing tasks',
        },
    },
    apis: ['./routes/*.js'],
};

module.exports = swaggerJsdoc(options);