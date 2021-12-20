var express = require('express');
var router = express.Router();
const db = require("../models");
const messageConst = require('../config/message');
//create nationality
router.post('/save', async (req, res, next) => {
    try {
        const nationality = await db.nationalityModel.findOne({ where: { name: req.body.name } })
        if (nationality) {
            return res.send({
                status: 208,
                message: messageConst.nationalityExist
            })
        }
        const categoryCreate = await db.categoryModel.create({
            name: req.body.name,
            status: req.body.status,
        })
        if (categoryCreate) {
            return res.send({
                status: 200,
                message: messageConst.nationalityCreateSuccess
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
//update category
router.post('/update/:id', async (req, res, next) => {
    try {
        const nationalityUpdate = await db.nationalityModel.update(req.body, { where: { id: req.params.id } })
        if (nationalityUpdate) {
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
//user list
router.get('/list', async (req, res, next) => {
    try {
        const nationalityList = await db.nationalityModel.findAll({ order: [['name', 'ASC']], })
        if (nationalityList) {
            return res.send({
                status: 200,
                results: nationalityList
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
//delete category
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const nationality = await db.nationalityModel.destroy({ where: { id: id } })
        if (!nationality) {
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