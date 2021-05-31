const express = require('express');
const router = require('./router');
const { handleHttpError } = require ('../utils/Error');
const { once } = require('events');
const config = require('../config');

const app = express();

app.use(express.json());

app.use('/api', router);

app.use((err, req, res , next) => {
    handleHttpError(err, res);
});

const startApp = () => {
    // console.log('hello');
    console.log(config.webPort);
    app.listen(config.webPort);
    // await once(app, 'listening');
    console.log(`http service running at ${config.webPort}`);

    // app.listen(port, () => {
    //     console.log(`http service running at ${port}`)
    // })
    // return app;
}

module.exports = startApp;