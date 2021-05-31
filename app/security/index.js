const crypto = require('crypto');

const signatureFunction = crypto.createSign('RSA-SHA256');
const verifyFunction = crypto.createVerify('RSA-SHA256');


const createPair = () => {
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
        // The standard secure default length for RSA keys is 2048 bits
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        }
    })

    return { publicKey, privateKey };
}


const sign = (payload, privateKey) => {
    signatureFunction.write(payload);
    signatureFunction.end();
    const signatureBase64 = signatureFunction.sign(privateKey, 'base64');
    return signatureBase64;
}

const isVerified = (data, signature, publicKey) => {
    verifyFunction.write(data);
    verifyFunction.end();

    const jwtSignatureBase64 = signature;
    return verifyFunction.verify(publicKey, jwtSignatureBase64, 'base64');
}

module.exports = { createPair, sign, isVerified };

