const mongoose = require('mongoose');
const config = require('../config');

module.exports = async () => {
    const connectionUrl = config.env === 'test' ? config.dbUrlTest : config.dbUrl;
    const dbOptions = config.dbOptions;

    await mongoose.connect(connectionUrl, dbOptions).catch(err => {
        console.log(`Database connection error: ${err}`);
        throw new Error(err);
    });

    console.log(`Database connection successful to ${connectionUrl}`);
    mongoose.set('useFindAndModify', false);
}