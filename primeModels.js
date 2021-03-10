const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const primeSchema = new Schema({
    user: {
        type: String,
    },
    algo: {
        type: String,
        required: true
    },
    answer: {
        type: Array,
    },
    timeStamp: {
        type: String,
    },
    timetaken: {
        type: String,
    },
    number1: {
        type: Number,
        required: true
    },
    number2: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    }
});

module.exports = mongoose.model('Primemodel', primeSchema);