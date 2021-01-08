const mongoose = require('mongoose');

const LocationSchema = mongoose.Schema({
    driverId: Number,
    lon: { type: Array },
    lat: { type: Array },
    namelocation: { type: Array },




})

module.exports = mongoose.model('LocationData', LocationSchema)