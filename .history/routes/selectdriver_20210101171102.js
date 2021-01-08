const express = require('express');
const router = express.Router();
const Location = require('../models/location');

router.get('/:pickup,:dropup', async(req, res) => {


    User.aggregate([
        { $match: { "userid": Number(req.params.userid) } },
    ]).then((documents => {
        //console.log(documents[0])
        res.status(200).json({ user: documents })
    }));




});


router.post('/add', async(req, res) => {
    console.log(req.body.vehicleid, req.body.type)
    let userids = req.body.userid;
    const location = new Location({
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
        const saveuser = await location.save();

        res.json(saveuser);

    } catch (err) {
        res.json({ errormessage: err });
    }


})





module.exports = router;