const mongoose = require('mongoose');

const VrouteSchema = mongoose.Schema({
    userid: { type: Number },
    startone: { type: String, default: "none" },
    stopone: { type: String, default: "none" },
    priceone: { type: String, default: "none" },
    starttwo: { type: String, default: "none" },
    stoptwo: { type: String, default: "none" },
    pricetwo: { type: String, default: "none" },
    startthree: { type: String, default: "none" },
    stopthree: { type: String, default: "none" },
    pricethree: { type: String, default: "none" },






})

module.exports = mongoose.model('vroute', VrouteSchema)