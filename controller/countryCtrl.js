var express = require('express');
var router = express.Router();
const db = require("../models");
const messageConst = require('../config/message');

//Country list
router.get('/list', async (req, res, next) => {
    try {
        const countryList = await db.countryModel.findAll({ order: [['country_name', 'ASC']], })
        if (countryList) {
            return res.send({
                status: 200,
                results: countryList
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
//Country update
router.post('/update/:id', async (req, res, next) => {
    try {
        const countryUpdate = await db.countryModel.update(req.body, { id: req.params.id })
        if (countryUpdate) {
            return res.send({
                status: 200,
                results: messageConst.updateSuccuss
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
        const country = await db.countryModel.destroy({ where: { id: id } })
        if (!country) {
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
module.exports = router;