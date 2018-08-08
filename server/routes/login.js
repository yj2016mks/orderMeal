var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var UserConsumer = require('../models/userconsumer');
var UserSystem = require('../models/usersystem');

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
    function findconsumer() {
        return new Promise((resolve,reject) => {
            param={
                name : req.body.name
            }
            UserConsumer.findOne(param,function(err,doc) { //从consumer里查找账户
                if(err) {
                    reject(err)
                } else {
                    resolve(doc)
                }
            })
        })
    }
    function findsystem() {
        return new Promise((resolve,reject) => {
            UserSystem.findOne(param,function(err,doc) {   //从system里查找账户
                if(err) {
                    reject(err)
                } else {
                    resolve(doc)
                }
            })
        })
    }
    Promise.all([findconsumer(),findsystem()])
            .then((resolve) => {
                if(resolve[0] != null) {   //账号在consumer里
                    res.json({
                        status:1,
                        msg:'',
                        result: resolve[0]
                    })
                }
                if(resolve[1] != null) {    //账号在system里
                    res.json({
                        status:2,
                        msg:'',
                        result: resolve[2]
                    })
                }
                if(resolve[0] == null && resolve[1] == null) {
                    res.json({
                        status:0,
                        msg:'用户或密码错误',
                    })
                }
                
            })
            .catch((err) => {
                res.json({
                    status:0,
                    msg:err
                });
            })
});
module.exports = router;