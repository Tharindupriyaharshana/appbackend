const mongoose = require('mongoose');

const DriverdataSchema = mongoose.Schema({
    driverId: Number,
    lon: { type: Array },
    lat: { type: Array },
    name: { type: Array }
})

module.exports = mongoose.model('Driverdata', DriverdataSchema)