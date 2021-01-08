const mongoose = require('mongoose');

const LocationSchema = mongoose.Schema({
    driverId: Number,
    date: String,
    time: String,
    message: String,


})

module.exports = mongoose.model('LocationData', LocationSchema)