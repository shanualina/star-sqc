var express = require('express');
var router = express.Router();
const db = require("../models");
const fs = require('fs');
const path = require("path");
const multer = require('multer');
const { extname } = require('path');
const aws = require('aws-sdk');
const messageConst = require('../config/message');
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
var uploadVideo = multer(imagesUpload).single('videos');
//create question
router.post('/save', uploadVideo, async (req, res, next) => {
    try {
        const roundOneExits = await db.roundOneQuestionModel.findOne({ where: { question: req.body.question } })
        if (roundOneExits) {
            return res.send({
                status: 208,
                message: messageConst.questionExits
            })
        }
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
        await s3.upload(params, (err, data) => {
            if (err) {
                console.log('Error occured while trying to upload to S3 bucket', err);
            }
            if (data) {
                fs.unlinkSync(req.file.path); // Empty temp folder
                const file = data.Location;
                db.roundOneQuestionModel.create({
                    categoryId: req.body.categoryId,
                    questionNo: req.body.questionNo,
                    videos: file,
                    question: req.body.question,
                    optionFirst: req.body.optionFirst,
                    optionSec: req.body.optionSec,
                    optionThird: req.body.optionThird,
                    optionFourth: req.body.optionFourth,
                    correctAns: req.body.correctAns,
                    point: req.body.point,
                    time: req.body.time,//sencond
                    flag: 0
                }).then(roundOneQuestion => {
                    if (roundOneQuestion) {
                        return res.send({
                            status: 200,
                            message: messageConst.questionSuccess
                        })
                    }
                })

            }
        })
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
        const roundOneQuestionUpdate = await db.roundOneQuestionModel.update(req.body, { where: { id: req.params.id } })
        if (roundOneQuestionUpdate) {
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
//question list
router.get('/list', async (req, res, next) => {
    try {
        const roundOneQuestionList = await db.roundOneQuestionModel.findAll({ order: [['questionNo', 'ASC']], })
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
        const category = await db.roundOneQuestionModel.destroy({ where: { id: id } })
        if (!category) {
            return res.json({
                status: 404,
                message: messageConst.deleteError
            });
        }
        return res.send({
            status: 200,
            category: messageConst.deleteSucess
        })
    } catch (error) {
        return res.send({
            status: 500,
            message: messageConst.unableProcess
        })
    }

})

router.get('/list/:catId', async (req, res, next) => {
    try {
        const roundOneQuestionList = await db.roundOneQuestionModel.findAll({
            where: {// [1,2,3] 
                categoryId: req.params.catId
            },
            order: Sequelize.literal('rand()'), limit: 5 },[['questionNo', 'ASC']]
        }
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