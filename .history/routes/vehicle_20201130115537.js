const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');
const Driver = require('../models/Driver');
var request = require('request');


router.post('/add', async(req, res) => {
    console.log(req.body.vehicleid, req.body.type)
    const user = new Vehicle({
        userid: req.body.userid,
        vehicleid: req.body.vehicleid,
        type: req.body.type,
        seat: req.body.seat,
        brand: req.body.brand,
        model: req.body.model,
        reqdate: Date.now()

    })

    try {
        const saveuser = await user.save();
        res.json(saveuser);

    } catch (err) {
        res.json({ errormessage: err });
    }
})


router.put("/second/:id", (req, res, next) => {

    console.log(req.params.id);
    let obid;
    let userid,
        vehicleid,
        type,
        seat,
        brand,
        model,
        reqdate;


    Vehicle.aggregate([
        { $match: { "vehicleid": req.params.id } },
    ]).then((documents => {
        console.log(documents[0])
        obid = documents[0]._id;
        userid: req.body.userid,
            vehicleid: req.body.vehicleid,
            type: req.body.type,
            seat: req.body.seat,
            brand: req.body.brand,
            model: req.body.model,
            reqdate: Date.now()

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



router.get('/:id', async(req, res) => {


    Vehicle.aggregate([
        { $match: { "vehicleid": req.params.id } },
    ]).then((documents => {
        //  console.log(documents[0])
        res.status(200).json({ vehicle: documents })
    }));




});

router.get('/user/:id', async(req, res) => {


    Vehicle.aggregate([
        { $match: { "userid": Number(req.params.id) } },
    ]).then((documents => {
        //  console.log(documents[0])
        res.status(200).json({ vehicle: documents })
    }));




});



router.put("/update/:id", (req, res, next) => {

    console.log(req.params.id);
    let obid;

    Vehicle.aggregate([
        { $match: { "vehicleid": req.params.id } },
    ]).then((documents => {
        console.log(documents[0]._id)
        obid = documents[0]._id;
        data();
    }));


    function data() {
        const user = new Vehicle({

            _id: obid,
            userid: req.body.userid,
            vehicleid: req.body.vehicleid,
            type: req.body.type,
            seat: req.body.seat,
            avilable: req.body.avilable,
            tv: req.body.tv,
            ac: req.body.ac,
            wiffi: req.body.wiffi,
            music: req.body.music,
            status: req.body.status,
            img1: req.body.img1,
            img2: req.body.img2,
            img3: req.body.img3,
            img4: req.body.img4,
            img5: req.body.img5,
            img6: req.body.img6,
            fullpayment: req.body.fullpay,
            halfpayment: req.body.halfpay,
            reqdate: Date.now()

        });
        // console.log(user);
        try {
            Vehicle.updateOne({ _id: obid }, user).then(result => {
                // console.log(result);
                console.log("Sucess")
                res.status(200).json({ message: "200", user });
            })
        } catch (err) {
            console.log("Error: " + err);
        }

    }


});



module.exports = router;