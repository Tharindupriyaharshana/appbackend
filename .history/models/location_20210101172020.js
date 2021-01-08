const mongoose = require('mongoose');

const LocationSchema = mongoose.Schema({
    driverId: String,
    lon: { type: Array },
    lat: { type: Array },
    namelocation: { type: Array },




})

module.exports = mongoose.model('LocationData', LocationSchema)