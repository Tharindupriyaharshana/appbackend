const mongoose = require('mongoose');

const UsernoteSchema = mongoose.Schema({
    userId: Number,
    date: String,
    time: String,
    message: String,
    to: String,

})

module.exports = mongoose.model('Usernote', UsernoteSchema)