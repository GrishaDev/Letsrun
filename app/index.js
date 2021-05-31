const startApp = require('./express/server');
const startDb = require('./mongo');

(async ()=> {
    startApp();
    await startDb();
})();