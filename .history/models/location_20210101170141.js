const mongoose = require('mongoose');

const LocationSchema = mongoose.Schema({
    driverId: Number,
    lon: { type: Array },
    lat: { type: Array },
    name1: String,
    name2: String



})

module.exports = mongoose.model('LocationData', LocationSchema)