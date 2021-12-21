var express = require('express');
var router = express.Router();
const db = require("../models");
const messageConst = require('../config/message');
const Sequelize = require("sequelize");
//questionF list
router.get('/list', async (req, res, next) => {
    try {
        
        const roundTwoQuestionList = await db.roundTwoQuestionModel.findAll({    order: Sequelize.literal('rand()'), limit: 3 })
        if (categoryList) {
            return res.send({
                status: 200,
                results: roundTwoQuestionList
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