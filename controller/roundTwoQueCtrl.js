var express = require('express');
var router = express.Router();
const db = require("../models");
const messageConst = require('../config/message');
//create question
router.post('/save', async (req, res, next) => {
    try {
        const roundTwoQuestionExits = await db.roundTwoQuestionModel.findOne({ where: { question: req.body.question } })
        if (roundTwoQuestionExits) {
            return res.send({
                status: 208,
                message: messageConst.questionExits
            })
        }
        const roundTwoQuestion = await db.roundTwoQuestionModel.create({
            categoryId: req.body.categoryId,
            entryDate: req.body.entryDate,
            videos: req.body.videos,
            question: req.body.question,
            ansOne: req.body.ansOne,
            ansTwo: req.body.ansTwo,
            ansThree: req.body.ansThree,
            ansFour: req.body.ansFour,
            correctAns: req.body.correctAns,
            clueOneVideo: req.body.clueOneVideo,
            clueTwoVideo: req.body.clueTwoVideo,
            clueThreeVideo: req.body.clueThreeVideo,
            flag: 1
        })
        if (roundTwoQuestion) {
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
//update question
router.post('/update/:id', async (req, res, next) => {
    try {
        const roundTwoQuestion = await db.roundTwoQuestionModel.update(req.body, { where: { id: req.params.id } })
        if (roundTwoQuestion) {
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
//questionF list
router.get('/list', async (req, res, next) => {
    try {
        const roundTwoQuestionList = await db.roundTwoQuestionModel.findAll({ order: [['name', 'ASC']], })
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
//delete question
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const roundTwoQuestion = await db.roundTwoQuestionModel.destroy({ where: { id: id } })
        if (!roundTwoQuestion) {
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