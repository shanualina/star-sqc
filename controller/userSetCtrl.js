var express = require('express');
var router = express.Router();
const db = require("../models");
const messageConst = require('../config/message');
//create user set
router.post('/save', async (req, res, next) => {
    try {
        const userSetExits = await db.userSetModel.findOne({ where: { question: req.body.question } })
        if (userSetExits) {
            return res.send({
                status: 208,
                message: messageConst.questionExits
            })
        }
        const userSet = await db.userSetModel.create({
            userSet: req.body.userSet,
            userId: req.body.userId,
            userSetId: req.body.userSetId,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            endTime: req.body.endTime,
            flag: 1,
            updatedBy: req.body.updatedBy
        })
        if (userSet) {
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
//update user set
router.post('/update/:id', async (req, res, next) => {
    try {
        const userSet = await db.userSetModel.update(req.body, { where: { id: req.params.id } })
        if (userSet) {
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
//user set list
router.get('/list', async (req, res, next) => {
    try {
        const userSetList = await db.userSetModel.findAll({})
        if (userSetList) {
            return res.send({
                status: 200,
                results: userSetList
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
//delete user set
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const userSet = await db.userSetModel.destroy({ where: { id: id } })
        if (!userSet) {
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