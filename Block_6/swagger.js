const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Library API',
        description: 'Documentation for Library API',
        version: '1.0.0'
    },
    host: 'localhost:3000',
    basePath: '/',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            name: 'Book',
            description: 'Endpoints zur Verwaltung von Büchern'
        },
        {
            name: 'Lend',
            description: 'Endpoints zur Verwaltung von Ausleihen'
        }
    ],
    definitions: {
        Book: {
            isbn: '978-3-86680-192-9',
            title: "Harry Potter and the Philosopher's Stone",
            year: 1997,
            author: 'J.K. Rowling'
        },
        Lend: {
            id: 1,
            customer_id: '123',
            isbn: '978-3-86680-192-9',
            borrowed_at: '2024-01-15T12:00:00Z'
        }
    }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./app.js']; // Passe ggf. an

swaggerAutogen(outputFile, endpointsFiles, doc);
