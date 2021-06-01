const { createPair, sign } = require('../security');
const Repository = require('./repository');

class Controller {
    static async signup(req, res) {
        const { body } = req;
        console.log('signup');
        const { publicKey, privateKey } = createPair();
        const publicKeyStr = publicKey.toString("base64");
        const merge = {
            totalDistanceRun: 0,
            publicKey: publicKeyStr
        }
        const merged = {...merge, ...body};
        await Repository.addRunner(merged);
        res.send(privateKey.toString("base64"));
    }

    // Used to create the signature, the 'yyyyy' part of xxxx.yyyyyy, and returns entire token. needed to test stuff.
    static async getToken(req, res) {
        const { data, privateKey } = req.body;
        const encodedData = Buffer.from(JSON.stringify(data)).toString('base64');
        console.log('=========================');
        console.log(encodedData);
        console.log('=========================');
        const signature = sign(encodedData, privateKey);
        res.send(`${encodedData}.${signature}`);
    }

    static async update(req, res) {
        const { decodedData, runner } = res.locals
        const totalDistanceRun = runner.totalDistanceRun + decodedData.distance;
        const updateObj = {
            totalDistanceRun
        }
        const updated = await Repository.updateRunner(runner.id, updateObj);
        res.send({totalDistanceRun: updated.totalDistanceRun});
    }

    static async myStats(req, res) {
        const { decodedData, runner } = res.locals
        const { type } = decodedData;
        const searchTerm = type === 'overall' ? {} : {[type]: runner[type]};
        const bestRunners = await Repository.getBestRunners(searchTerm);
        const targetRunnerRank = bestRunners.findIndex((human) => human.id === runner.id);
        const rank = targetRunnerRank === -1 ? -1 : targetRunnerRank + 1;
        res.json({ranking: rank});
    }
}

module.exports = Controller