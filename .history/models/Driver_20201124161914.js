const mongoose = require('mongoose');

const DriverSchema = mongoose.Schema({
    userid: { type: Number },
    fname: { type: String, default: "none" },
    sname: { type: String, default: "none" },
    email: { type: String, default: "none" },
    status: { type: String, default: "New" },
    nicfront: { type: String, default: "none" },
    nicback: { type: String, default: "none" },
    dliceanfront: { type: String, default: "none" },
    dliceanback: { type: String, default: "none" },
    city: { type: String, default: "none" },
    address: { type: String, default: "none" },
    type: { type: String, default: "none" },
    regdate: { type: String, default: "2020.10.12" },


})

module.exports = mongoose.model('driver', DriverSchema)