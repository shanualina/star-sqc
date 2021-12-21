var express = require('express');
var router = express.Router();
const db = require("../models");
const messageConst = require('../config/message');
//create transaction


//transaction list
router.get('/list/:userId', async (req, res, next) => {
    try {
        const transactionList = await db.transactionModel.findAll({})
        if (categoryList) {
            return res.send({
                status: 200,
                results: transactionList
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