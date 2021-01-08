const express = require('express');
const router = express.Router();
const Location = require('../models/location');

router.get('/:location', async(req, res) => {

    console.log(req.params.location);
    Location.aggregate([

    ]).then((documents => {
        console.log(documents);
        //  res.status(200).json({ user: documents })
    }));




});


router.post('/add', async(req, res) => {
    console.log(req.body.vehicleid, req.body.type)
    let userids = req.body.userid;
    const location = new Location({
        driverId: req.body.driverid,
        lon: req.body.lon,
        lat: req.body.lat,
        namelocation: req.body.name,


    })

    try {
        const saveuser = await location.save();

        res.json(saveuser);

    } catch (err) {
        res.json({ errormessage: err });
    }


})





module.exports = router;