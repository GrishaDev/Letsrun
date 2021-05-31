const startApp = require('./express/server');
const startDb = require('./mongo');

(async ()=> {
    startApp(3000);
    await startDb();
})();