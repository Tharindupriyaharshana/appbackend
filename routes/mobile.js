const express = require('express');
const router = express.Router();
const Mobile = require('../models/Mobile');
const User = require('../models/User');
var request = require('request');


router.get('/:mobilenum', async(req, res) => {
    console.log(req.params.mobilenum);
    let deta = [];
    let num = [];
    let newuserid = 0;
    let otp;
    var sender = req.params.mobilenum;

    while (sender.charAt(0) === '+') {
        sender = sender.substring(1);
    }
    while (sender.charAt(0) === '9') {
        sender = sender.substring(1);
    }
    while (sender.charAt(0) === '4') {
        sender = sender.substring(1);
    }


    while (sender.charAt(0) === '0') {
        sender = sender.substring(1);
    }
    while (sender.charAt(0) === '+') {
        sender = sender.substring(1);
    }
    while (sender.charAt(0) === '9') {
        sender = sender.substring(1);
    }
    while (sender.charAt(0) === '4') {
        sender = sender.substring(1);
    }


    var realsender = "94" + sender;
    console.log(realsender);
    try {
        Mobile.aggregate([
            { $match: { "mobilenumber": Number(realsender) } },



            {
                $lookup: {
                    from: "users",
                    localField: "userid",
                    foreignField: "userid",
                    as: "user"
                }


            },


        ]).then(result => {
            result.map(app => {
                //  console.log(app)
                num.push(app);

            });

            if (num.length == 0) {

                User.find(null, 'userid').sort({ userid: -1 }).limit(1).then(result => {
                    console.log(result);
                    newuserid = result[0].userid + 1;
                    console.log(newuserid);
                    saveme();
                }).catch(err => {
                    console.log("Error: " + err);
                });




                function saveme() {
                    const user = new User({

                        userid: newuserid,

                    });
                    user.save().then(createdPost => {
                        console.log("post User");
                    });

                    const mobiles = new Mobile({

                        userid: newuserid,
                        mobilenumber: realsender,
                    });
                    mobiles.save().then(createdPost => {
                        console.log("post Mobile");
                        genreateOTP();
                        sendsms();
                        show();
                    });
                }

            } else {
                genreateOTP();
                sendsms();
                show();
            }

        }).catch(err => {
            console.log("Error: " + err);
        })

        function genreateOTP() {
            otp = Math.floor(1000 + Math.random() * 9000);
            console.log("your otp is    " + otp);
        }



        function sendsms() {


            let message = "Your Daily Route verification code is:" + otp + ". Don't share this code with anyone;our employees will never ask for this code";
            var options = {

                'method': 'POST',
                'url': 'https://app.newsletters.lk/smsAPI?sendsms&apikey=ICcenN1YgHUTYB9vpGzSE8KlEDt6f5xd&apitoken=JIMA1584899484&from=DEMO_SMS&to=' + realsender + '&type=sms&text=' + message,




            };
            request(options, function(error, response) {
                if (error) throw new Error(error);
                console.log(response.body);
            });
        }

        function show() {

            Mobile.aggregate([
                { $match: { "mobilenumber": Number(realsender) } },



                {
                    $lookup: {
                        from: "users",
                        localField: "userid",
                        foreignField: "userid",
                        as: "user"
                    }


                },


            ]).then(result => {
                result.map(app => {
                    //console.log(app)
                    deta.push(app);

                });
                res.status(201).json({

                    userid: deta[0].userid,
                    userstatus: deta[0].user[0].status,
                    otp: otp,
                    type: deta[0].user[0].type


                });
            }).catch(err => {
                console.log("Error: " + err);
            })

        }
    } catch {
        console.log("Error: " + err);
    }


});

router.post('/', async(req, res) => {
    console.log("we are here");
    const mobi = new Mobile({
        userid: req.body.userid,
        mobilenumber: req.body.mobilenumber
    })

    try {
        const savemobi = await mobi.save();
        res.json(savemobi);

    } catch (err) {
        res.json({ errormessage: err });
    }
})


router.post('/user/', async(req, res) => {

    const user = new User({
        userid: req.body.userid,

    })

    try {
        const saveuser = await user.save();
        res.json(saveuser);

    } catch (err) {
        res.json({ errormessage: err });
    }
})




router.put("/:id", (req, res, next) => {

    console.log(req.params.id);
    let obid;

    User.aggregate([
        { $match: { "userid": Number(req.params.id) } },
    ]).then((documents => {
        console.log(documents[0]._id)
        obid = documents[0]._id;
        data();
    }));


    function data() {
        const user = new User({

            _id: obid,
            userid: req.params.id,
            name: req.body.name,
            city: req.body.city,
            address: req.body.address,
            email: req.body.email,
            gender: req.body.gender,
            status: "created",
            pick: "none",
            drop: "none",
            near: "none",
            type: req.body.type,
            regdate: req.body.regdate,
            startdate: req.body.startdate

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

    User.aggregate([
        { $match: { "userid": Number(req.params.id) } },
    ]).then((documents => {
        console.log(documents[0]._id)
        obid = documents[0]._id;
        data();
    }));


    function data() {
        const user = new User({

            _id: obid,
            userid: req.params.id,
            name: req.body.name,
            city: req.body.city,
            address: req.body.address,
            email: req.body.email,
            gender: req.body.gender,
            status: "location",
            pickup: req.body.pick,
            drop: req.body.drop,
            near: req.body.near,
            type: req.body.type,
            regdate: req.body.regdate,
            startdate: req.body.startdate

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



router.get('/user/:userid', async(req, res) => {


    User.aggregate([
        { $match: { "userid": Number(req.params.userid) } },
    ]).then((documents => {
        //console.log(documents[0])
        res.status(200).json({ user: documents })
    }));




});


module.exports = router;