const mongoose = require('mongoose');

const UsernotecountSchema = mongoose.Schema({
    userId: Number,
    count: Number,

})

module.exports = mongoose.model('Usernotecount', UsernotecountSchema)