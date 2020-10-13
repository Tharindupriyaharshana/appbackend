const express = require('express');
const router = express.Router();
const Mobile = require('../models/Mobile');
const Driver = require('../models/Driver');
var request = require('request');


router.get('/:mobilenum', async(req, res) => {
    console.log(req.params.mobilenum);
    let deta = [];
    let num = [];
    let newuserid = 0;
    let otp;

    try {
        Mobile.aggregate([
            { $match: { "mobilenumber": Number(req.params.mobilenum) } },



            {
                $lookup: {
                    from: "drivers",
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

                Driver.find(null, 'userid').sort({ userid: -1 }).limit(1).then(result => {
                    console.log(result);
                    newuserid = result[0].userid + 1;
                    console.log(newuserid);
                    saveme();
                }).catch(err => {
                    console.log("Error: " + err);
                });




                function saveme() {
                    const user = new Driver({

                        userid: newuserid,


                    });
                    user.save().then(createdPost => {
                        console.log("post Driver");
                    });

                    const mobiles = new Mobile({

                        userid: newuserid,
                        mobilenumber: req.params.mobilenum,
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
                'url': 'https://app.newsletters.lk/smsAPI?sendsms&apikey=ICcenN1YgHUTYB9vpGzSE8KlEDt6f5xd&apitoken=JIMA1584899484&from=DEMO_SMS&to=' + req.params.mobilenum + '&type=sms&text=' + message,



            };
            request(options, function(error, response) {
                if (error) throw new Error(error);
                console.log(response.body);
            });
        }

        function show() {

            Mobile.aggregate([
                { $match: { "mobilenumber": Number(req.params.mobilenum) } },



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

                    userid: deta,
                    //userstatus: deta[0].user[0].status,
                    otp: otp,


                });
            }).catch(err => {
                console.log("Error: " + err);
            })

        }
    } catch {
        console.log("Error: " + err);
    }


});


router.post('/driver/', async(req, res) => {

    const user = new Driver({
        userid: req.body.userid,

    })

    try {
        const saveuser = await user.save();
        res.json(saveuser);

    } catch (err) {
        res.json({ errormessage: err });
    }
})


module.exports = router;