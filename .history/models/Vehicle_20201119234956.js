const mongoose = require('mongoose');

const VehicleSchema = mongoose.Schema({
    userid: { type: Number },
    vehicleid: { type: String, default: "none" },
    type: { type: String, default: "none" },
    seat: { type: Number, default: 20 },
    avilable: { type: Number, default: 20 },
    tv: { type: String, default: "none" },
    ac: { type: String, default: "none" },
    wiffi: { type: String, default: "none" },
    usb: { type: String, default: "none" },
    status: { type: String, default: "none" },
    img1: { type: String, default: "none" },
    img2: { type: String, default: "none" },
    img3: { type: String, default: "none" },
    img4: { type: String, default: "none" },
    img5: { type: String, default: "none" },
    img6: { type: String, default: "none" },
    fullpayment: { type: Number, default: 100 },
    halfpayment: { type: Number, default: 100 },

    reqdate: { type: Date, default: "2020.10.12" },

})

module.exports = mongoose.model('Vehicle', VehicleSchema)