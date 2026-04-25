/**
 * Konfiguration der OpenAPI-Dokumentation.
 * Generiert die API-Spezifikation aus den JSDoc-Kommentaren in routes/.
 * Erreichbar unter: http://localhost:3000/api-docs
 */
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