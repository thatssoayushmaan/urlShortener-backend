const express = require('express');
const router = express.Router();

const User = require('../models/User')
const bcrypt = require("bcrypt");

router.post('/', async (req,res) => {
    try{
        let data = await User.findOne({email : req.body.email})
        if(data){
            let compare = await bcrypt.compare(req.body.password, data.password)
            if(compare){
                res.status(200).json({
                    message : "Login Successful"
                })
            }else{
                res.status(400).json({
                    message: "Login Failed"
                })
            }
        } else{
            res.status(401).json({
                message: "Email not registered"
            })
        }
    }
    catch(error){
        console.log(error)
    }
})

module.exports = router