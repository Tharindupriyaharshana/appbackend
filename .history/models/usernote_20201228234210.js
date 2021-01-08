const mongoose = require('mongoose');

const UsernoteSchema = mongoose.Schema({
    driverId: Number,
    date: String,
    time: String,
    message: String,
    to: String,

})

module.exports = mongoose.model('Usernote', UsernoteSchema)