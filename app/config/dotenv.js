
const dotenv = require('dotenv');

const dotenvPath = process.env.LOAD_DEV_DOTENV &&  '.env';
dotenv.config({ path: dotenvPath });