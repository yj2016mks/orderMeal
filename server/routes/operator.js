var express = require('express');
var router = express.Router();
var DashFood = require('../models/dashfood');
var OperatorSystem = require('../models/operatorsystem');
//菜品管理
router.post('/addnewdash',function(req,res,next) {
    if(req.body) {
        var params = req.body;
        var newdashparam = new DashFood(params);
        newdashparam.save(function(err,doc) {
            if(err) {
                res.json({
                    status:'0',
                    msg:err
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
    }
})
router.get('/getdashlish',function(req,res,next) {
    if(req.query) {
        var params = req.query
    } else {
        var params = {}
    }
    DashFood.find(params,function(err,doc) {
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
router.post('/food/statuschange',function(req,res,next) {
    if(req.body) {
        var params = req.body;
        DashFood.update({_id:params.id},{'$set':{authority:params.authority}},function(err,doc) {
            if(err) {
                res.json({
                    status:'0',
                    msg:err
                })
            } else {
                if(doc) {
                    res.json({
                        status:'1',
                        result:'修改成功'
                    })
                }
            }
        })
    }
})
router.post('/food/deldash',function(req,res,next) {
    if(req.body) {
        var params = {
            _id:req.body.id
        }
        DashFood.remove(params,function(err,doc) {
            if(err) {
                res.json({
                    status:'0',
                    msg:err
                })
            } else {
                if(doc) {
                    res.json({
                        status:'1',
                        result:'删除成功'
                    })
                }
            }
        })
    }
})
//系统设置
router.post('/setsystem',function(req,res,next) {
    if(req.body) {
        var params = {
            deadchecked:req.body.deadchecked,
            remindchecked:req.body.remindchecked,
            authority:req.body.authority,
            deadlines:req.body.deadlines,
            reminds:req.body.reminds
        }
        OperatorSystem.remove({},function(err,doc) {
            var operatorsystem = new OperatorSystem(params);
            operatorsystem.save(function(err,doc) {
                if(err) {
                    res.json({
                        status:'0',
                        msg:err
                    })
                } else {
                    if(doc) {
                        res.json({
                            status:'1',
                            result:'修改成功'
                        })
                    }
                }
            })
            
        })
    }
})
router.get('/getsystem',function(req,res,next) {
    OperatorSystem.find({},function(err,doc) {
        if(err) {
            res.json({
                status:'0',
                msg:err
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