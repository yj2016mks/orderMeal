var express = require('express');
var router = express.Router();
var UserConsumer = require('../models/userconsumer');


router.get('/',function(req,res,next) {
    if(req.query.searchStr) {
        var param = {
            name : req.query.searchStr,
        };
    } else {
        var param = {};
    }
    
    UserConsumer.find(param,function(err,doc) {
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
router.post('/addnewuser',function(req,res,next) {
    if(req.body) {
        var params = req.body;
        var newuserparam = new UserConsumer(params);
        newuserparam.save(function(err,doc) {
            if(err) {
                res.json({
                    status:'0',
                    msg:err
                })
            } else {
                if(doc) {
                    res.json({
                        status:'1',
                        result:'添加成功'
                    })
                }
            }
        });
    }
})
router.post('/deletuser',function(req,res,next) {
    if(req.body) {
        var param = req.body;
        UserConsumer.findOne(param,function(err,doc) {
            if(err) {
                res.json({
                    status:'0',
                    msg:'数据库错误'
                })
            } else {
                if(doc) {
                    UserConsumer.remove(doc,function(err,deletdoc) {
                        if(err) {
                            res.json({
                                status:'0',
                                msg:'数据库错误'
                            }) 
                        } else {
                            res.json({
                                status:'1',
                                msg:'删除成功'
                            })
                        }
                        
                    });
                }
            }
        });
    }
})
module.exports = router;