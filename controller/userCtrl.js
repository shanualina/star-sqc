var express = require('express');
var router = express.Router();
const db = require("../models");
const messageConst = require('../config/message');
const config = require("../config/auth.config");
var jwt = require('jsonwebtoken');
//user registartion and login
router.post('/login', async (req, res, next) => {
    try {
        const user = await db.userModel.findOne({ where: { emailId: req.body.emailId } })
        if (user) {
            // facebook login
            if (req.body.LoginBy == 1) {
                const userUpdate = await db.userModel.update({
                    LoginBy: req.body.LoginBy,//fb 1
                    lastLogin: new Date(),
                }, { where: { id: user.id } })
                if (userUpdate) {
                    var token = jwt.sign({ id: user.id }, config.secret, { expiresIn: "12d" });
                    return res.send({
                        status: 200,
                        token: token
                    })
                }
            } else if (req.body.LoginBy == 2) {
                // google login
                const userSave = await db.userModel.update({
                    LoginBy: req.body.LoginBy,// google 2
                    lastLogin: new Date(),
                }, { where: { id: user.id } })
                if (userSave) {
                    var token = jwt.sign({ id: user.id }, config.secret, { expiresIn: "12d" });
                    return res.send({
                        status: 200,
                        token: token
                    })
                }
            }
        }
        else {
            // facebook login
            if (req.body.LoginBy == 1) {
                const faceBoookLogin = await db.userModel.create({
                    emailId: req.body.emailId,
                    name: req.body.name,
                    dob: new Date(),
                    gender: req.body.gender,
                    nationalityId: req.body.nationalityId,
                    countryId: req.body.countryId,
                    countryCode: req.body.countryCode,
                    mobileNo: req.body.mobileNo,
                    status: 0,//0 active 1 decative
                    flag: 0,//0 active 1 decative
                    fbLoginId: req.body.fbLoginId,
                    fbLoginData: req.body.fbLoginData,//json
                    LoginBy: req.body.LoginBy,//fb 1 google 2
                    fbProfilePic: req.body.fbProfilePic,
                    lastLogin: new Date(),
                    isActive: 0,
                })
                if (faceBoookLogin) {
                    var token = jwt.sign({ id: faceBoookLogin.id }, config.secret, { expiresIn: "12d" });
                    return res.send({
                        status: 200,
                        token: token
                    })
                }
            } else {
                // google login
                const googleLogin = await db.userModel.create({
                    emailId: req.body.emailId,
                    name: req.body.name,
                    dob: req.body.dob,
                    gender: req.body.gender,
                    nationalityId: req.body.nationalityId,
                    countryId: req.body.countryId,
                    countryCode: req.body.countryCode,
                    mobileNo: req.body.mobileNo,
                    status: 0,
                    flag: 0,
                    googleLoginId: req.body.googleLoginId,
                    googleLoginData: req.body.googleLoginData,
                    LoginBy: req.body.LoginBy,//fb 1 google 2
                    googleProfilepic: req.body.googleProfilepic,
                    lastLogin: new Date(),
                    isActive: 0,
                })
                if (googleLogin) {
                    var token = jwt.sign({ id: googleLogin.id }, config.secret, { expiresIn: "12d" });
                    return res.send({
                        status: 200,
                        token: token
                    })
                }
            }
        }

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            status: 500,
            message: messageConst.unableProcess
        })
    }
})
//update information
router.post('/update/:id', async (req, res, next) => {
    try {
        const user = await db.userModel.update(req.body, { where: { id: req.params.id } })
        if (user) {
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
//user for admin
router.get('/list', async (req, res, next) => {
    try {
        const user = await db.userModel.findAll({ order: [['name', 'ASC']], })
        if (user) {
            return res.send({
                status: 200,
                results: user
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
router.get('/profile/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await db.userModel.findOne({ where: { id: id } })
        if (!user) {
            return res.json({
                status: 404,
                message: messageConst.deleteError
            });
        }
        return res.send({
            status: 200,
            data: user
        })
    } catch (error) {
        return res.send({
            status: 500,
            message: messageConst.unableProcess
        })
    }

})
module.exports = router;