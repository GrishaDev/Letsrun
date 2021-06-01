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

    const allRunners = await Repository.getAllRunners();
    const verifiedRunner = allRunners.find(runner => isVerified(data, signature, runner.publicKey))

    if(!verifiedRunner) throw new HttpError(403, 'Access denied');

    res.locals.runner = verifiedRunner;
    res.locals.decodedData = decodedData;
    return next();
}



module.exports = { isAllowed }