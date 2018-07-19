var express = require('express');
var router = express.Router();
var System = require('../models/usersystem');


router.get('/',function(req,res,next) {
    if(req.query.searchStr) {
        var param = {
            name : req.query.searchStr,
        };
    } else {
        var param = {};
    }
    
    System.find(param,function(err,doc) {
        if(err) {
            res.json({
                status:'0',
                msg:'格式错误'
            })
        } else {
            if(doc) {
                res.json({
                    status:'1',
                    result:doc
                })
            }
        }
    })
})
module.exports = router;