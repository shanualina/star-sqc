var express = require('express');
var router = express.Router();
const db = require("../models");
const sequelize = require("sequelize");
// random question
router.get('/list/:catId', async (req, res, next) => {
    try {
        const roundOneQuestionList = await db.roundOneQuestionModel.findAll({
            where: {// [1,2,3] 
                categoryId: req.params.catId
            },
            order: sequelize.literal('rand()'), limit: 3
        })
        if (roundOneQuestionList) {
            return res.send({
                status: 200,
                results: roundOneQuestionList
            })
        }
        return res.send({
            status: 404,
            message: messageConst.listblank
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: 500,
            message: messageConst.unableProcess
        })
    }
})
module.exports = router;