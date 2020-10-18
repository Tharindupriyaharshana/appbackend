const express = require('express');
const router = express.Router();
const Mobile = require('../models/Mobile');
const User = require('../models/User');
var request = require('request');

router.put("/status/:id", (req, res, next) => {

    console.log(req.params.id);
    let obid;

    let userid;
    let name;
    let city;
    let address;
    let email;
    let gender;
    //  let  status;
    let pickup;
    let drop;
    let near;
    let type;
    let regdate;
    let startdate;

    User.aggregate([
        { $match: { "userid": Number(req.params.id) } },
    ]).then((documents => {
        console.log(documents[0])
        obid = documents[0]._id;
        userid = documents[0].userid;
        name = documents[0].name;
        city = documents[0].city;
        address = documents[0].address;
        email = documents[0].email;
        gender = documents[0].gender;
        //  let  status;
        pickup = documents[0].pickup;
        drop = documents[0].drop;
        near = documents[0].near;;
        type == documents[0].type;
        regdate = documents[0].regdate;
        startdate = documents[0].startdate;
        data();
    }));


    function data() {
        const user = new User({

            _id: obid,
            userid: userid,
            name: name,
            city: city,
            address: address,
            email: email,
            gender: gender,
            status: req.body.status,
            pickup: pickup,
            drop: drop,
            near: near,
            type: type,
            regdate: regdate,
            startdate: startdate

        });
        // console.log(user);
        try {
            User.updateOne({ _id: obid }, user).then(result => {
                // console.log(result);
                console.log("Sucess")
                res.status(200).json({ message: "200", user });
            })
        } catch {
            console.log("Error: " + err);
        }

    }


});


router.put("/type/:id", (req, res, next) => {

    console.log(req.params.id);
    let obid;

    let userid;
    let name;
    let city;
    let address;
    let email;
    let gender;
    let status;
    let pickup;
    let drop;
    let near;
    //  let type;
    let regdate;
    let startdate;

    User.aggregate([
        { $match: { "userid": Number(req.params.id) } },
    ]).then((documents => {
        console.log(documents[0])
        obid = documents[0]._id;
        userid = documents[0].userid;
        name = documents[0].name;
        city = documents[0].city;
        address = documents[0].address;
        email = documents[0].email;
        gender = documents[0].gender;
        status = documents[0].status;
        pickup = documents[0].pickup;
        drop = documents[0].drop;
        near = documents[0].near;;
        // type == documents[0].type;
        regdate = documents[0].regdate;
        startdate = documents[0].startdate;
        data();
    }));


    function data() {
        const user = new User({

            _id: obid,
            userid: userid,
            name: name,
            city: city,
            address: address,
            email: email,
            gender: gender,
            status: status,
            pickup: pickup,
            drop: drop,
            near: near,
            type: req.body.type,
            regdate: regdate,
            startdate: startdate

        });
        // console.log(user);
        try {
            User.updateOne({ _id: obid }, user).then(result => {
                // console.log(result);
                console.log("Sucess")
                res.status(200).json({ message: "200", user });
            })
        } catch {
            console.log("Error: " + err);
        }

    }


});



router.put("/location/:id", (req, res, next) => {

    console.log(req.params.id);
    let obid;

    let userid;
    let name;
    let city;
    let address;
    let email;
    let gender;
    let status;
    //  let pickup;
    //  let drop;
    //  let near;
    let type;
    let regdate;
    let startdate;

    User.aggregate([
        { $match: { "userid": Number(req.params.id) } },
    ]).then((documents => {
        console.log(documents[0])
        obid = documents[0]._id;
        userid = documents[0].userid;
        name = documents[0].name;
        city = documents[0].city;
        address = documents[0].address;
        email = documents[0].email;
        gender = documents[0].gender;
        // status = documents[0].status;
        //pickup = documents[0].pickup;
        // drop = documents[0].drop;
        // near = documents[0].near;;
        type = documents[0].type;
        regdate = documents[0].regdate;
        startdate = documents[0].startdate;
        data();
    }));


    function data() {
        const user = new User({

            _id: obid,
            userid: userid,
            name: name,
            city: city,
            address: address,
            email: email,
            gender: gender,
            status: req.body.status,
            pickup: req.body.pickup,
            drop: req.body.drop,
            near: req.body.near,
            type: type,
            regdate: regdate,
            startdate: startdate

        });
        // console.log(user);
        try {
            User.updateOne({ _id: obid }, user).then(result => {
                // console.log(result);
                console.log("Sucess")
                res.status(200).json({ message: "200", user });
            })
        } catch {
            console.log("Error: " + err);
        }

    }


});




module.exports = router;