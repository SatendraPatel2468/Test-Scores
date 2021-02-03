const mongoose = require('mongoose')

const scores = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    firstTest: {
        type: Number,
        index: true
    },
    secondTest: {
        type: Number,
        index: true
    },
    thirdTest: {
        type: Number,
        index: true
    }
});

module.exports = mongoose.model('score', scores)