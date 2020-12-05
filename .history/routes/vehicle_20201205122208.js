const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');
const Driver = require('../models/Driver');
var request = require('request');
const { updateMany } = require('../models/Driver');
const { ObjectId } = require('mongodb');


router.post('/add', async(req, res) => {
    console.log(req.body.vehicleid, req.body.type)
    let userids = req.body.userid;
    const user = new Vehicle({
        userid: req.body.userid,
        vehicleid: req.body.vehicleid,
        type: req.body.type,

        brand: req.body.brand,
        model: req.body.model,
        province: req.body.province,
        reqdate: Date.now(),
        status: "1"
    })

    try {
        const saveuser = await user.save();
        userup()
        res.json(saveuser);

    } catch (err) {
        res.json({ errormessage: err });
    }

    function userup() {
        Driver.updateOne({ userid: userids }, { status: "add", }, function(
            err,
            result
        ) {

        });
    }
})


router.put("/vehicle/:id", (req, res, next) => {

    console.log("here", req.params.id);


    Vehicle.aggregate([
        { $match: { "vehicleid": req.params.id } },
    ]).then((documents => {
        console.log(documents[0])
        obid = documents[0]._id;
        userid = documents[0].userid,
            vehicleid = documents[0].vehicleid,
            type = documents[0].type,

            brand = documents[0].brand,
            model = documents[0].model,
            province = documents[0].model.province,
            reqdate = documents[0].reqdate

        data();
    }));


    function data() {
        const user = new Vehicle({
            _id: obid,
            userid: userid,
            vehicleid: vehicleid,
            type: type,
            seat: req.body.seat,
            brand: brand,
            model: model,
            province: province,
            tv: req.body.tv,
            ac: req.body.ac,
            wiffi: req.body.wiffi,
            usb: req.body.usb,
            mp3: req.body.mp3,
            status: "vehicle2",
            img1: req.body.img1,
            img2: req.body.img2,
            img3: req.body.img3,
            img4: req.body.img4,
            img5: req.body.img5,
            img6: req.body.img6,

            reqdate: reqdate



        });
        // console.log(user);
        try {
            Vehicle.updateOne({ _id: obid }, user).then(result => {
                // console.log(result);
                userup();
                console.log("Sucess")
                res.status(200).json({ message: "200", user });
            })
        } catch {
            console.log("Error: " + err);
        }

    }

    function userup() {
        Driver.updateOne({ userid: userids }, { status: "vehicle2", }, function(
            err,
            result
        ) {

        });
    }


});

router.put("/pick/:id", (req, res, next) => {

    console.log(req.params.id);


    Vehicle.aggregate([
        { $match: { "vehicleid": req.params.id } },
    ]).then((documents => {
        console.log(documents[0])
        obid = documents[0]._id;
        userid = documents[0].userid,
            vehicleid = documents[0].vehicleid,
            type = documents[0].type,

            brand = documents[0].brand,
            model = documents[0].model,

            reqdate = documents[0].reqdate,
            seat = documents[0].seat,
            brand = documents[0].brand,
            model = documents[0].model,
            province = documents[0].province,
            tv = documents[0].tv,
            ac = documents[0].ac,
            wiffi = documents[0].wiffi,
            usb = documents[0].usb,
            mp3 = documents[0].mp3,
            status = documents[0].staus,
            img1 = documents[0].img1,
            img2 = documents[0].img2,
            img3 = documents[0].img3,
            img4 = documents[0].img4,
            img5 = documents[0].img5,
            img6 = documents[0].img6,
            reqdate = documents[0].reqdate,
            data();
    }));


    function data() {
        const user = new Driver({

            userid: userid,
            vehicleid: vehicleid,
            type: type,
            seat: req.body.seat,
            brand: brand,
            model: model,
            province: province,
            tv: req.body.tv,
            ac: req.body.ac,
            wiffi: req.body.wiffi,
            usb: req.body.usb,
            mp3: req.body.mp3,
            status: req.body.staus,
            img1: req.body.img1,
            img2: req.body.img2,
            img3: req.body.img3,
            img4: req.body.img4,
            img5: req.body.img5,
            img6: req.body.img6,

            reqdate: reqdate



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

router.patch("/pickme/:id", (req, res, next) => {

    console.log(req.params.id);


    Vehicle.aggregate([
        { $match: { "vehicleid": req.params.id } },
    ]).then((documents => {
        console.log(documents[0])
        obid = documents[0]._id;


        data();
    }));


    function data() {
        const option = { new: true };
        const user = new Vehicle({

            pickup: req.body.pickup,
            drop: req.body.drop,



        });
        // console.log(user);
        try {
            Vehicle.findOneAndUpdate(obid, user, option).then(result => {
                // console.log(result);
                console.log("Sucess")
                res.status(200).json({ message: "200", result });
            })
        } catch {
            console.log("Error: " + err);
        }

    }


});


router.put('/up/:id', function(req, res) {
    Vehicle.updateOne({ vehicleid: req.params.id }, { pickup: req.body.pick, drop: req.body.drop, status: "location", }, function(
        err,
        result
    ) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
});


router.put('/:id', (req, res, next) => {

    let obid;
    Vehicle.aggregate([
        { $match: { "vehicleid": req.params.id } },
    ]).then((documents => {
        console.log(documents[0])
        obid = documents[0]._id;
        upme(obid)


    }));

    function upme(obid) {
        try {
            console.log(obid)
            const id = obid;
            const upda = req.body;
            const option = { new: true };
            const user = new Vehicle({

                pickup: req.body.pickup,
                drop: req.body.drop,



            });
            Vehicle.updateOne({ _Id: obid }, { pickup: "colombo" }, function(
                err,
                result
            ) {
                if (err) {
                    res.send(err);
                } else {
                    res.json(result);
                }
            });

        } catch (error) {
            console.log(error.message)
        }
    }


})
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