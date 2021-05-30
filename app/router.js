const express = require('express');
const router = express.Router();
const crypto = require('crypto');

let public;
let private;
let signature;
// let shutup;

router.post('/signup', (req, res) => {
    const { body } = req;

    // const data = {
    //     "name": "John Doe",
    //     "age": 31,
    //     "city": "New York"
    // }
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

    public = publicKey;
    private = privateKey;

    // const encryptedData = crypto.publicEncrypt(
    //     {
    //         key: publicKey,
    //         padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    //         oaepHash: "sha256",
    //     },
    //     Buffer.from(JSON.stringify(body))
    // )

    // const signature = crypto.sign("sha256", Buffer.from(JSON.stringify(body)), {
    //     key: privateKey,
    //     padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
    // })

    // console.log(signature.toString("base64"))

    //console.log("encypted data: ", encryptedData.toString("base64"))
    console.log("=========================================");
    console.log(publicKey.toString("base64"));
    console.log("=========================================");

    res.send(privateKey.toString("base64"));

    // generateKeyPair('rsa', {
    //     modulusLength: 4096,
    //     publicKeyEncoding: {
    //       type: 'spki',
    //       format: 'pem'
    //     },
    //     privateKeyEncoding: {
    //       type: 'pkcs8',
    //       format: 'pem',
    //       cipher: 'aes-256-cbc',
    //       passphrase: 'top secret'
    //     }
    //   }, (err, publicKey, privateKey) => {
    //         console.log(publicKey);
    //         console.log('===================');
    //         console.log(privateKey);
    //         res.send(privateKey);
    //   });
});

router.post('/signature', (req, res) => {
    const { data, privateKey } = req.body;

    const a = JSON.stringify(data);
    const b = Buffer.from(a).toString('base64')

    console.log("=========================");
    console.log(b);
    console.log("=========================");

    signature = crypto.sign("sha256", Buffer.from(b), {
        key: private,
        padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
    })
    // shutup = signature;
    res.send(signature.toString("base64"));
});

router.post('/update', (req, res) => {
    const { request } = req.body;

    const splited = request.split('.');
    const data = splited[0];
    // const signature = splited[1];

    //Buffer.from(data),
    // const verifier = crypto.createVerify('sha256');

    const isVerified = crypto.verify(
        "sha256",
        Buffer.from(data),
        {
            key: public,
            padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
        },
        // Buffer.from(signature),
        signature
    )

    // const isVerified = verifier.verify(public, signature, 'base64');

    res.send(isVerified);

});
module.exports = router;