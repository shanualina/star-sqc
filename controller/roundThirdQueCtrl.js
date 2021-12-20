var express = require('express');
var router = express.Router();
const db = require("../models");
const messageConst = require('../config/message');
const aws = require('aws-sdk');
const multer = require('multer');
const fs = require('fs');
const { extname } = require('path');
const path = require("path");
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_S3_BUCKET_NAME } = require('dotenv').config().parsed;
if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY || !AWS_S3_BUCKET_NAME) {
    throw new Error('Invalid .env config');
}
function fileFilter(res, file, cb) {
    // Allowed ext
    const filetypes = /mp4|MPEG-4|mkv/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
    if (extname) {
        return cb(null, true);
    } else {
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
}
const limits = {
    fieldNameSize: 200,
    files: 20,
    fields: 20
}
const storage = multer.diskStorage({
    destination: './public/file/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + extname(file.originalname));
    }
});
const imagesUpload = {
    fileFilter: fileFilter,
    storage: storage,
    limits: limits
};
var uploadImage = multer(imagesUpload).array('video', 3);
//create question
router.post('/save', uploadImage, async (req, res, next) => {
    try {

        aws.config.setPromisesDependency();
        aws.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        });
        const s3 = new aws.S3();
        var params = {
            ACL: 'public-read',
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Body: fs.createReadStream(req.file.path),
            Key: `images/${req.file.filename}`
        };
        s3.upload(params, (err, data) => {
            if (err) {
                console.log('Error occured while trying to upload to S3 bucket', err);
            }
            if (data) {
                fs.unlinkSync(req.file.path); // Empty temp folder
                console.log(data.Location);
            }
        })
        // const roundThirdQuestionExits = await db.roundThirdQuestionModel.findOne({ where: { question: req.body.question } })
        // if (roundThirdQuestionExits) {
        //     return res.send({
        //         status: 208,
        //         message: messageConst.questionExits
        //     })
        // }
        // const roundThirdQuestion = await db.roundThirdQuestionModel.create({
        //     categoryId: req.body.categoryId,
        //     entryDate: req.body.entryDate,
        //     videos: req.body.videos,
        //     question: req.body.question,
        //     ansOne: req.body.ansOne,
        //     ansTwo: req.body.ansTwo,
        //     ansThree: req.body.ansThree,
        //     ansFour: req.body.ansFour,
        //     correctAns: req.body.correctAns,
        //     clueOneVideo: req.body.clueOneVideo,
        //     clueTwoVideo: req.body.clueTwoVideo,
        //     clueThreeVideo: req.body.clueThreeVideo,
        //     flag: 1
        // })
        if (roundThirdQuestion) {
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
        const roundThirdQuestionUpdate = await db.roundThirdQuestionModel.update(req.body, { where: { id: req.params.id } })
        if (roundThirdQuestionUpdate) {
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
        const roundThirdQuestiList = await db.roundThirdQuestionModel.findAll({ order: [['name', 'ASC']], })
        if (roundThirdQuestiList) {
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