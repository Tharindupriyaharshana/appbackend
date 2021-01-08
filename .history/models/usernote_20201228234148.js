const mongoose = require('mongoose');

const DrivernoteSchema = mongoose.Schema({
    driverId: Number,
    date: String,
    time: String,
    message: String,
    to: String,

})

module.exports = mongoose.model('Drivernote', DrivernoteSchema)