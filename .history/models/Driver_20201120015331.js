const mongoose = require('mongoose');

const DriverSchema = mongoose.Schema({
    userid: { type: Number },
    fname: { type: String, default: "none" },
    sname: { type: String, default: "none" },
    email: { type: String, default: "none" },
    status: { type: String, default: "New" },
    nic: { type: String, default: "none" },
    city: { type: String, default: "none" },
    address: { type: String, default: "none" },
    type: { type: String, default: "none" },
    regdate: { type: String, default: "2020.10.12" },


})

module.exports = mongoose.model('Driver', DriverSchema)