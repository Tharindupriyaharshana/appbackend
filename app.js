const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config')
let port = process.env.PORT || 3001;
const app = express();
const bodayParser = require('body-parser');
app.use(bodayParser.json());
//import routes
const mobileRoute = require('./routes/mobile');
const dmobileRoute = require('./routes/drivermobile');
const driverRoute = require('./routes/driver');
const vehicleRoute = require('./routes/vehicle');

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH,PUT, DELETE, OPTIONS"
    );
    next();
});



mongoose.connect(process.env.DB_CONN, { useNewUrlParser: true }, () =>
    console.log("conected to db"));


//use of midleware

app.use('/mobile', mobileRoute);
app.use('/driverm', dmobileRoute);
app.use('/driver', driverRoute);
app.use('/vehicle', vehicleRoute);


app.listen(port);