var express = require('express');
var router = express.Router();
var DashFood = require('../models/dashfood');
var CartFood = require('../models/cartfood');

//获得订餐清单
router.get('/getcartlish',function(req,res,next) {
    if(req.query) {
        var params = req.query
        CartFood.find(params,function(err,doc) {
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
    }
})

function savefood(diffvalue) {
    return new Promise(function(resolve, reject) {
        diffvalue.forEach(function(val,index) {
            DashFood.findOne({'_id': val.id},function(finderr,finddoc) {
                if(finderr) {
                    reject(finderr);
                } else {
                    if(finddoc) {
                        var num = finddoc.num + val.value;
                        DashFood.update({'_id': val.id},{'$set':{'num':num}},function(err,doc) {
                            if(err) {
                                reject(err);
                            } else {
                                resolve({status:'1',result:doc})
                            }
                        })
                    }
                }
            })
        })
    })
}
//修改订餐清单
router.post('/setcartfood',function(req,res,next) {
    if(req.body) {
        var doc = '';
        var params = req.body;console.log(params)
        var promise = new Promise((resolve, reject) => {
            CartFood.findOne({'account': params.account},function(finderr,finddoc) {
                if(finderr) {
                    reject(finderr);
                } else {
                    if(finddoc == null) {   //第一次添加
                        var cartfoodparam = new CartFood(params);
                        cartfoodparam.save(function(saveerr,savedoc) {
                            if(saveerr) {
                                reject(saveerr);
                            } else {
                                resolve(params.diffvalue);
                            }
                        })
                    } else {
                        CartFood.update({'account': params.account},{'$set':{'cartlist':params.cartlist}},function(err,doc) {
                            if(err) {
                                reject(err);
                            } else {
                                resolve(params.diffvalue);
                            }
                        })
                    }
                }
            })
        })
        promise.then(savefood)
                .then((jsonparams)=>{
                    res.json(jsonparams);
                }).catch((err => {
                    res.json({
                        status:'0',
                        msg:err
                    });
                }));
    }
})
module.exports = router;