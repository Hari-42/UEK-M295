const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


const app = express();
app.use(express.json());


app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



app.listen(3000, () => {
    console.log('Server läuft auf http://localhost:3000/swagger-ui');
});
