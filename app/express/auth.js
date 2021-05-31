const { HttpError } = require ('../utils/Error');
const { isVerified } = require('../security');
const Repository = require('./repository');

const isAllowed = async (req, res, next) => {
    const { request } = req.body;

    const splited = request.split('.');
    const data = splited[0];
    const signature = splited[1];

    const bufferObj = Buffer.from(data, "base64");
    const decodedString = bufferObj.toString("utf8");
    const decodedData = JSON.parse(decodedString);

    const runner = await Repository.getRunner(decodedData.id);
    const pubKey = runner.publicKey;
    const check = isVerified(data, signature, pubKey);

    if(!check) throw new HttpError(403, 'Access denied');

    res.locals.runner = runner;
    res.locals.decodedData = decodedData;
    return next();
}



module.exports = { isAllowed }