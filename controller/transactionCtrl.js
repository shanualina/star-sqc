var express = require('express');
var router = express.Router();
const db = require("../models");
const messageConst = require('../config/message');
//create transaction
router.post('/save', async (req, res, next) => {
    try {
        const transactionExits = await db.transactionModel.findOne({ where: { question: req.body.question } })
        if (transactionExits) {
            return res.send({
                status: 208,
                message: messageConst.questionExits
            })
        }
        const transaction = await db.transactionModel.create({
            userId: req.body.userId,
            questionId: req.body.questionId,
            userSetId: req.body.userSetId,
            userAns: req.body.userAns,
            userPoint: req.body.userPoint,
            userRound: req.body.userRound,
            bouncePoint: req.body.bouncePoint,
            qtimeTaken: req.body.qtimeTaken,
            flag: 1,
            updatedBy: req.body.updatedBy
        })
        if (transaction) {
            return res.send({
                status: 200,
                message: messageConst.questionSuccess
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            status: 500,
            message: messageConst.unableProcess
        })
    }
})
//update transaction
router.post('/update/:id', async (req, res, next) => {
    try {
        const transaction = await db.transactionModel.update(req.body, { where: { id: req.params.id } })
        if (transaction) {
            return res.send({
                status: 200,
                message: messageConst.updateSuccuss
            })
        }
        return res.send({
            status: 204,
            message: messageConst.NoContent
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            status: 500,
            message: messageConst.unableProcess
        })
    }
})
//transaction list
router.get('/list', async (req, res, next) => {
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
//delete transaction
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const transaction = await db.transactionModel.destroy({ where: { id: id } })
        if (!transaction) {
            return res.json({
                status: 404,
                message: messageConst.deleteError
            });
        }
        return res.send({
            status: 200,
            message: messageConst.deleteSucess
        })
    } catch (error) {
        return res.send({
            status: 500,
            message: messageConst.unableProcess
        })
    }

})
module.exports = router;