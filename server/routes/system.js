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
router.post('/addnewuser',function(req,res,next) {
    if(req.body) {
        var params = req.body;console.log(params)
        var newuserparam = new System(params);
        newuserparam.save(function(err,doc) {console.log(doc)
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
        System.findOne(param,function(err,doc) {
            if(err) {
                res.json({
                    status:'0',
                    msg:'数据库错误'
                })
            } else {
                if(doc) {
                    System.remove(doc,function(err,deletdoc) {
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