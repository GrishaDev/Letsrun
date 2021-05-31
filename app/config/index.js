
const env = require('env-var');
require('./dotenv');

module.exports = {
    env: env.get('env').default('dev').asString(),
    dbOptions: { useUnifiedTopology: true , useNewUrlParser: true },
    dbUrl: env.get('DB_URL').required().asUrlString(),
    dbUrlTest: env.get('DB_URL_TEST').required().asUrlString(),
}