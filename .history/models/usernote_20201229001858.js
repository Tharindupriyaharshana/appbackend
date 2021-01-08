const mongoose = require('mongoose');

const UsernoteSchema = mongoose.Schema({
    userId: Number,
    date: String,
    time: String,
    message: String,
    to: Number,
    status: { type: String, default: "new" }

})

module.exports = mongoose.model('Usernote', UsernoteSchema)