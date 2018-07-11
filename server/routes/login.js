var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next) {
    res.json({id:1,name:'张三'});
});
module.exports = router;