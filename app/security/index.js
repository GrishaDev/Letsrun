const crypto = require('crypto');
const { cryptoSettings } = require('../config');

const createPair = () => {
    const { publicKey, privateKey } = crypto.generateKeyPairSync(cryptoSettings.keyType, {
        modulusLength: cryptoSettings.keyLength,
        publicKeyEncoding: {
            type: cryptoSettings.publicType,
            format: cryptoSettings.format
        },
        privateKeyEncoding: {
            type: cryptoSettings.privateType,
            format: cryptoSettings.format
        }
    })
    return { publicKey, privateKey };
}


const sign = (payload, privateKey) => {
    const signatureFunction = crypto.createSign(cryptoSettings.algorithm);
    signatureFunction.write(payload);
    signatureFunction.end();

    const signatureBase64 = signatureFunction.sign(privateKey, 'base64');
    return signatureBase64;
}

const isVerified = (data, signature, publicKey) => {
    const verifyFunction = crypto.createVerify(cryptoSettings.algorithm);
    verifyFunction.write(data);
    verifyFunction.end();

    const jwtSignatureBase64 = signature;
    return verifyFunction.verify(publicKey, jwtSignatureBase64, 'base64');
}

module.exports = { createPair, sign, isVerified };
