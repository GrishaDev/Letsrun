const mongoose = require('mongoose');
const config = require('../config');
const shortid = require('shortid');


const schema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        default: shortid.generate
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    totalDistanceRun: {
        type: Number,
        required: true,
        default: 0
    },
    publicKey: {
        type: String,
        required: true
    }
});

// makes the final object on view prettier with just id field and not _id.
schema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model(`runners`, schema);