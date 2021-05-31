const { createPair, sign, isVerified } = require('../security');
const Repository = require('./repository');
// let temp;

class Controller {
    static async signup(req, res) {
        const { body } = req;
        console.log('signup');
        
        const { publicKey, privateKey } = createPair();
        // temp = publicKey;
        const publicKeyStr = publicKey.toString("base64");

        const merge = {
            totalDistanceRun: 0,
            publicKey: publicKeyStr
        }

        const merged = {...merge, ...body};

        const runner = await Repository.addRunner(merged);

        res.send(privateKey.toString("base64"));
    }

    static async signature(req, res) {
        const { data, privateKey } = req.body;

        const a = JSON.stringify(data);
        const b = Buffer.from(a).toString('base64')

        console.log("=========================");
        console.log(b);
        console.log("=========================");

        const signature = sign(b, privateKey);
        // shutup = signature;
        res.send(signature);
    }

    static async update(req, res) {
        const { request } = req.body;

        const splited = request.split('.');
        const data = splited[0];
        const signature = splited[1];

        // const check = isVerified(data, signature, pubKey);
        const bufferObj = Buffer.from(data, "base64");
        const decodedString = bufferObj.toString("utf8");
        const decodedData = JSON.parse(decodedString);

        const runner = await Repository.getRunner(decodedData.id);

        const pubKey = runner.publicKey;

        const check = isVerified(data, signature, pubKey);
        
        const totalDistanceRun = runner.totalDistanceRun + decodedData.distance;
        const updateObj = {
            totalDistanceRun
        }
        
        

        const updated = await Repository.updateRunner(runner.id, updateObj);

        res.send(check);
    }

    static async mystats(req, res) {
        const { request } = req.body;

        const splited = request.split('.');
        const data = splited[0];
        const signature = splited[1];

        // const check = isVerified(data, signature, pubKey);

        const bufferObj = Buffer.from(data, "base64");
        const decodedString = bufferObj.toString("utf8");
        const decodedData = JSON.parse(decodedString);

        const runner = await Repository.getRunner(decodedData.id);

        const pubKey = runner.publicKey;

        // const totalDistanceRun = runner.totalDistanceRun + decodedData.distance;
        // const updateObj = {
        //     totalDistanceRun
        // }

        
        const check = isVerified(data, signature, pubKey);
        
        const { type } = decodedData;

        const updated = await Repository.updateRunner(runner.id, updateObj);

        res.send(check);
    }

}

module.exports = Controller