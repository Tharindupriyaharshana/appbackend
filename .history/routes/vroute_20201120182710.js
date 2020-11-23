const express = require('express');
const router = express.Router();

const vroute = require('../models/Vroute');
var request = require('request');
const Vroute = require('../models/Vroute');



router.put("/:id", (req, res, next) => {

    console.log(req.params.id);
    let obid;

    vroute.aggregate([
        { $match: { "userid": Number(req.params.id) } },
    ]).then((documents => {
        console.log(documents[0]._id)
        obid = documents[0]._id;
        data();
    }));


    function data() {
        const user = new vroute({

            _id: obid,
            userid: req.params.id,
            startone: req.params.startone,
            stopone: req.params.stopone,
            priceone: req.params.priceone,
            starttwo: req.params.startwo,
            stoptwo: req.params.stoptwo,
            pricetwo: req.params.pricetwo,
            startthree: req.params.startthree,
            stopthree: stopthree,
            pricethree: pricethree,



        });
        // console.log(user);
        try {
            vroute.updateOne({ _id: obid }, user).then(result => {
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

    vroute.aggregate([
        { $match: { "userid": Number(req.params.driverid) } },
    ]).then((documents => {

        res.status(200).json({ pricing: documents })
    }));




});

router.post('/add', async(req, res) => {
    console.log(req.body.vehicleid, req.body.type)
    const user = new Vroute({
        userid: req.params.id,
        startone: req.params.startone,
        stopone: req.params.stopone,
        priceone: req.params.priceone,
        starttwo: req.params.startwo,
        stoptwo: req.params.stoptwo,
        pricetwo: req.params.pricetwo,
        startthree: req.params.startthree,
        stopthree: req.params.stoptthree,
        pricethree: req.params.pricethree,

    })

    try {
        const saveuser = await user.save();
        res.json(saveuser);

    } catch (err) {
        res.json({ errormessage: err });
    }
})

module.exports = router;