var express = require('express');
var router = express.Router();
const db = require("../models");


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
module.exports = router;