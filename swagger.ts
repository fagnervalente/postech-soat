const swaggerAutoGen = require('swagger-autogen')();
const path = require('path');

const outputFile = './swagger_output.json';
const endpointsFiles = [path.join(__dirname, './src/adapter/http/routes/main.ts')];

swaggerAutoGen(outputFile, endpointsFiles);