var express = require('express');
var router = express.Router();
var DashFood = require('../models/dashfood');
var OperatorSystem = require('../models/operatorsystem');
var CartFood = require('../models/cartfood');
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
                var myDate = new Date();
                var servertime = myDate.getTime();
                var setTime = doc[0].deadlines[doc[0].deadchecked].name;
                var setTimearry = setTime.split(':');
                var sethour = parseInt(setTimearry[0]);
                var setminu = parseInt(setTimearry[1]);
                var settime = myDate.setHours(sethour,setminu);
                var diffms = settime - servertime;  //设置时间与当前时间的差值
                
                res.json({
                    status:'1',
                    result:{countdown:diffms,opesystem:doc}
                })
            }
        }
    })
})
function getcartfood() {
    return new Promise((resolve, reject) => {
        CartFood.find({},function(err,doc) {
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
}
function getuserconsumer() {
    return new Promise((resolve, reject) => {
        CartFood.find({},function(err,doc) {
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
}
//获得用户订单
router.get('/getorder',function(req,res,next) {
    
        
})
module.exports = router;