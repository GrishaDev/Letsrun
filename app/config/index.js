
const env = require('env-var');
require('./dotenv');

module.exports = {
    env: env.get('env').default('dev').asString(),
    webPort: env.get('PORT').required().asIntPositive(),
    dbOptions: { useUnifiedTopology: true , useNewUrlParser: true },
    dbUrl: env.get('DB_URL').required().asUrlString(),
    validTypes: ['overall', 'city', 'age'],
    cryptoSettings : {
        keyType: 'rsa',
        keyLength: 2048,
        publicType: 'spki',
        privateType: 'pkcs8',
        format: 'pem',
        algorithm: 'RSA-SHA256'
    }
}