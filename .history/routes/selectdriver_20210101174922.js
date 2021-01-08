const express = require('express');
const router = express.Router();
const Location = require('../models/location');
const _ = require('lodash');
router.get('/', async(req, res) => {

    console.log(req.body.location);
    const passengerData = req.body.location;

    const selecting_driver_count = 5;
    Location.find().then((documents => {
        var dtas = main(documents);
        console.log(dtas);
        res.status(200).json({ Drivers: dtas })
    }));



    const main = (data) => {
        const distanceData = distance(data);

        return _.chain(distanceData)
            .sortBy(["pick_min", "drop_min"])
            .slice(0, selecting_driver_count)
            .map(driver => driver.driverId)
            .value()


    }

    const distance = data => {

        return new_driver_data = data.map(driver => {

            const pick_lon = driver.lon.map(lon => {
                return (lon - passengerData.pick.lon) ** 2;
            })

            const pick_lat = driver.lat.map(lat => {
                return (lat - passengerData.pick.lat) ** 2;
            })

            const drop_lon = driver.lon.map(lon => {
                return (lon - passengerData.drop.lon) ** 2;
            })

            const drop_lat = driver.lat.map(lat => {
                return (lat - passengerData.drop.lat) ** 2;
            })

            const pick_distance = pick_lon.map((lon, index) => {
                return (lon + pick_lat[index]) ** 0.5
            })

            const drop_distance = drop_lon.map((lon, index) => {
                return (lon + drop_lat[index]) ** 0.5
            })

            const pick_min = _.min(pick_distance);
            const drop_min = _.min(drop_distance);

            return {
                pick_min: pick_min,
                drop_min: drop_min,
                driverId: driver.driverId
            }

        })


    }


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