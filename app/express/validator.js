const Joi = require('joi');
const config = require('../config');
const { HttpError } = require ('../utils/Error');

const signUpSchema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().required(),
    city: Joi.string().required()
});

const requestSchema = Joi.object({
    request: Joi.string().required(),
});

const signSchema = Joi.object({
    data: Joi.object({
        id: Joi.string().required(),
        type: Joi.string().valid(...config.validTypes),
        distance: Joi.number(),
    }).or('type', 'distance'),
    privateKey: Joi.string().required(),
});



const isValidSignUp = (req, res, next) => {
    const { error } = signUpSchema.validate(req.body);
    if(error) {
        sendError(error);
    }
    next(); 
}

const isValidRequest = (req, res, next) => {
    const { error } = requestSchema.validate(req.body);
    if(error) {
        sendError(error);
    }
    next(); 
}

const isValidSign = (req, res, next) => {
    const { error } = signSchema.validate(req.body);
    if(error) {
        sendError(error);
    }
    next(); 
}

const sendError = (err) => {
    let msg = err.details[0].message;
    msg = msg.replace(/"/g, '');
    throw new HttpError(400, msg);
}

module.exports = { isValidSignUp, isValidRequest, isValidSign }