const express = require('express');
const router = express.Router();

const vroute = require('../models/Vroute');
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
            nic: req.body.nic,
            type: req.body.type,
            regdate: req.body.regdate,


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
    ]).then((documents => {

        res.status(200).json({ driver: documents })
    }));




});


module.exports = router;