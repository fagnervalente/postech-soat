const swaggerAutoGen = require('swagger-autogen')();
const path = require('path');

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/adapter/http/routes/*.{ts,js}'];

swaggerAutoGen(outputFile, endpointsFiles);