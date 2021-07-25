const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

router.post('/', async (req,res) => {
    try {
        let data = await User.findOne({ email: req.body.email })
            if (data) {
                res.status(400).json({ message: "User already exists" });
            } else {
                let salt = await bcrypt.genSalt(10);
                let hash = await bcrypt.hash(req.body.password, salt);
                req.body.password = hash;
                await User.create(req.body);
                res.status(200).json({ message: "Registration Successful" });
            }
    } catch (error) {
        console.log(error)   
    }
})


module.exports = router