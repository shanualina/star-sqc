var express = require('express');
var router = express.Router();
const db = require("../models");
const messageConst = require('../config/message');

//user list
router.get('/list', async (req, res, next) => {
    try {
        const nationalityList = await db.nationalityModel.findAll({ order: [['name', 'ASC']], })
        if (nationalityList) {
            return res.send({
                status: 200,
                results: nationalityList
            })
        }
        return res.send({
            status: 404,
            message: messageConst.listblank
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