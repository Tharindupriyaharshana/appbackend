const mongoose = require('mongoose');

const DMobileSchema = mongoose.Schema({
    userid: Number,
    mobilenumber: Number

})

module.exports = mongoose.model('drivermobile', DMobileSchema)