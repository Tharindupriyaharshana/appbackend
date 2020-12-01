const mongoose = require('mongoose');

const VehicleSchema = mongoose.Schema({
    userid: { type: Number },
    vehicleid: { type: String, default: "none" },
    type: { type: String, default: "none" },
    seat: { type: Number, default: 20 },

    tv: { type: String, default: "none" },
    ac: { type: String, default: "none" },
    wiffi: { type: String, default: "none" },
    usb: { type: String, default: "none" },
    mp3: { type: String, default: "none" },
    status: { type: String, default: "none" },
    img1: { type: String, default: "none" },
    img2: { type: String, default: "none" },
    img3: { type: String, default: "none" },
    img4: { type: String, default: "none" },
    img5: { type: String, default: "none" },
    img6: { type: String, default: "none" },


    reqdate: { type: String },

})

module.exports = mongoose.model('Vehicle', VehicleSchema)