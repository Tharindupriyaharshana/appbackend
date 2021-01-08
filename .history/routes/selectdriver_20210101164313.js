const express = require('express');
const router = express.Router();

router.get('/:pickup,:dropup', async(req, res) => {


    User.aggregate([
        { $match: { "userid": Number(req.params.userid) } },
    ]).then((documents => {
        //console.log(documents[0])
        res.status(200).json({ user: documents })
    }));




});




module.exports = router;