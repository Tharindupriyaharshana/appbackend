const express = require('express');
const router = express.Router();
const Mobile = require('../models/Mobile');
const Driver = require('../models/Driver');
var request = require('request');



router.put("/:id", (req, res, next) => {

    console.log(req.params.id);
    let obid;

    Driver.aggregate([
        { $match: { "userid": Number(req.params.id) } },
    ]).then((documents => {
        console.log(documents[0]._id)
        obid = documents[0]._id;
        data();
    }));


    function data() {
        const user = new Driver({

            _id: obid,
            userid: req.params.id,
            fname: req.body.fname,
            sname: req.body.sname,
            city: req.body.city,
            address: req.body.address,
            email: req.body.email,
            status: "created",
            nicfront: "none",
            nicback: "none",
            dliceanfront: "none",
            dliceanback: "none",





        });
        // console.log(user);
        try {
            Driver.updateOne({ _id: obid }, user).then(result => {
                // console.log(result);
                console.log("Sucess")
                res.status(200).json({ message: "200", user });
            })
        } catch {
            console.log("Error: " + err);
        }

    }


});

router.put("/second/:id", (req, res, next) => {

    console.log(req.params.id);
    let obid;



    Driver.aggregate([
        { $match: { "userid": Number(req.params.id) } },
    ]).then((documents => {
        console.log(documents[0])
        obid = documents[0]._id;
        userid = req.params.id;
        fname = documents[0].fname;
        sname = documents[0].sname;
        city = documents[0].city;
        address = documents[0].address;
        email = documents[0].email;
        data();
    }));


    function data() {
        const user = new Driver({

            _id: obid,
            userid: userid,
            fname: fname,
            sname: sname,
            city: city,
            address: address,
            email: email,
            status: "Second",
            nicfront: req.body.nicfront,
            nicback: req.body.nicback,
            dliceanfront: req.body.dliceanfront,
            dliceanback: req.body.dliceanback,





        });
        // console.log(user);
        try {
            Driver.updateOne({ _id: obid }, user).then(result => {
                // console.log(result);
                console.log("Sucess")
                res.status(200).json({ message: "200", user });
            })
        } catch {
            console.log("Error: " + err);
        }

    }


});


router.get('/:driverid', async(req, res) => {
    console.log("hello world")

    Driver.aggregate([
        { $match: { "userid": Number(req.params.driverid) } },

        {
            $lookup: {
                from: "Vehicles",
                localField: "userid",
                foreignField: "userid",
                as: "Vehicle"
            }


        },
    ]).then((documents => {
        console.log(documents);
        res.status(200).json({ driver: documents })
    }));




});


module.exports = router;