 const mongoose = require('mongoose');

 const MobileSchema = mongoose.Schema({
     userid: Number,
     mobilenumber: Number

 })

 module.exports = mongoose.model('Mobile', MobileSchema)