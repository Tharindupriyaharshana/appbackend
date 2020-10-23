const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    userid: { type: Number },
    name: { type: String, default: "none" },
    city: { type: String, default: "none" },
    address: { type: String, default: "none" },
    email: { type: String, default: "none" },
    gender: { type: String, default: "none" },
    status: { type: String, default: "New" },
    pickup: { type: String, default: "none" },
    drop: { type: String, default: "none" },
    near: { type: String, default: "none" },
    type: { type: String, default: "none" },
    regdate: { type: Date, default: "2020.10.12" },
    startdate: { type: Date, default: "2020.10.12" },
    pay: { type: String, default: "cash" },
    share: { type: String, default: "none" },

})

module.exports = mongoose.model('User', UserSchema)