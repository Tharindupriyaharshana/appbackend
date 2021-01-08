const mongoose = require('mongoose');

const DriverdataSchema = mongoose.Schema({
    driverId: Number,
    lon: String,
    lat:String,

})

module.exports = mongoose.model('Driverdata', DriverdataSchema)