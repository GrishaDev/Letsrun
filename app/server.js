const express = require('express');
const router = require('./router');

const app = express();

app.use(express.json());

app.use('/api', router);

const startApp = (port) => {
    console.log('hello');
    app.listen(port, () => {
        console.log(`http service running at ${port}`)
    })
    return app;
}

module.exports = startApp;