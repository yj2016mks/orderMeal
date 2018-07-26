var express = require('express');
var router = express.Router();
var DashFood = require('../models/dashfood');

router.post('/addnewdash',function(req,res,next) {
    if(req.body) {
        var params = req.body;
        var newuserparam = new DashFood(params);
        newuserparam.save(function(err,doc) {
            if(err) {
                res.json({
                    status:'0',
                    msg:err
                })
            } else {
                if(doc) {console.log(doc)
                    res.json({
                        status:'1',
                        result:'添加成功'
                    })
                }
            }
        })
    }
})
module.exports = router;