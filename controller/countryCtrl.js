var express = require('express');
var router = express.Router();
const db = require("../models");
const messageConst = require('../config/message');

//Country list
router.get('/list', async (req, res, next) => {
    try {
        const countryList = await db.countryModel.findAll({ order: [['country_name', 'ASC']], })
        if (countryList) {
            return res.send({
                status: 200,
                results: countryList
            })
        }
        return res.send({
            status: 404,
            results: messageConst.listblank
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            status: 500,
            message: messageConst.unableProcess
        })
    }
})

module.exports = router;