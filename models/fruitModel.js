const mongoose = require('mongoose');

const fruitSchema = new mongoose.Schema({
    name: {'type': String, 'required': true},
    color: {'type': String, 'required': true},
    weight: {'type': Number, 'required': true},
    calories: {'type': Number, 'required': true},
    extras: {'type': String, 'required': false},
    user_id: {'type': String, 'required': true}
}, { timestamps: true });

module.exports = mongoose.model('Fruit', fruitSchema);
