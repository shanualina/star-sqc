var express = require('express');
var router = express.Router();
const db = require("../models");
const fs = require('fs');
const path = require("path");
const multer = require('multer');
const { extname } = require('path');
const aws = require('aws-sdk');
const messageConst = require('../config/message');
// const imagesUpload = require('../config/imageUplaode');
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_S3_BUCKET_NAME } = require('dotenv').config().parsed;
if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY || !AWS_S3_BUCKET_NAME) {
    throw new Error('Invalid .env config');
}
function fileFilter(res, file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png/;
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
var uploadImage = multer(imagesUpload).single('image');
//create category
router.post('/save', uploadImage, async (req, res, next) => {
    try {
        console.log(req.file)
        const category = await db.categoryModel.findOne({ where: { name: req.body.name } })
        if (category) {
            return res.send({
                status: 208,
                message: messageConst.categoryExist
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
                db.categoryModel.create({
                    name: req.body.name,
                    serialNo: req.body.serialNo,
                    categoryImage: file,
                    status: 0,//1 deactive 0 active
                }).then(data => {
                    if (data) {
                        return res.send({
                            status: 200,
                            message: messageConst.categoryCreateSuccess
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
//update category
router.post('/update/:id', async (req, res, next) => {
    try {
        const categoryUpdate = await db.categoryModel.update(req.body, { where: { id: req.params.id } })
        if (categoryUpdate) {
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
//category list admin
router.get('/list', async (req, res, next) => {
    try {
        const categoryList = await db.categoryModel.findAll({ order: [['name', 'ASC']], })
        if (categoryList) {
            return res.send({
                status: 200,
                results: categoryList
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
//category for user
router.get('/categorylist', async (req, res, next) => {
    try {
        const categoryList = await db.categoryModel.findAll({ order: [['name', 'ASC']], })
        if (categoryList) {
            return res.send({
                status: 200,
                results: categoryList
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
//delete category
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const categoryUpdate = await db.categoryModel.update(req.body, { where: { id: req.params.id } })
        if (categoryUpdate) {
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
        return res.send({
            status: 500,
            message: messageConst.unableProcess
        })
    }

})
module.exports = router;