import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog Post API Documentation',
      version: '1.0.1',
      description: 'API documentation for your application',
    },
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpecs = swaggerJsdoc(options);

export default swaggerSpecs;
