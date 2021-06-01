const express = require('express');
const router = require('./router');
const { handleHttpError } = require ('../utils/Error');
const config = require('../config');

const app = express();

app.use(express.json());

app.use('/api', router);

app.use((err, req, res , next) => {
    handleHttpError(err, res);
});

const startApp = () => {
    console.log(config.webPort);
    app.listen(config.webPort);
    console.log(`http service running at ${config.webPort}`);
}

module.exports = startApp;