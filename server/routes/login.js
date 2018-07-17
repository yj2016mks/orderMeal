var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Login = require('../models/userlogins');

mongoose.connect('mongodb://127.0.0.1:27017/mypage');

mongoose.connection.on('connected',function() {
    console.log('MongoDB connected success');
})

mongoose.connection.on('error',function() {
    console.log('MongoDB connected fail');
})

mongoose.connection.on('disconnected',function() {
    console.log('MongoDB connected disconnected');
})

router.post('/',function(req,res,next) {
    var param = {
        name : req.body.name,
        password : req.body.password,
    };
    Login.findOne(param,function(err,doc) {
        if(err) {
            res.json({
                status:'0',
                msg:'格式错误'
            })
        } else {
            if(doc) {
                res.json({
                    status:'1',
                    msg:'登陆成功',
                    result:{
                        userloginName:doc
                    }
                })
                // res.location('/myitem')
            } else {
                res.json({
                    status:'0',
                    msg:'帐号密码不对哦!'
                })
            }
        }
    })
});
module.exports = router;