const express = require('express');
const router = express.Router();

const ShortUrl = require('../models/Shorturl')

router.post('/', async (req,res) => {
    try {
        await ShortUrl.create({
            fullURL : req.body.url
        })
        let data = await ShortUrl.findOne({
            fullURL : req.body.url
        })
        res.status(200).json({
            shorturl : data.shortURL
        })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router