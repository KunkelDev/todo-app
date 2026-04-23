const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Todo API',
            version: '1.0.0',
            description: 'REST API zur Verwaltung von To-Do-Eintraegen',
        },
    },
    apis: ['./routes/*.js'],
};

module.exports = swaggerJsdoc(options);