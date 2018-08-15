var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var login = require('./routes/login');
var system = require('./routes/system');
var operator = require('./routes/operator');
var consumer = require('./routes/consumer');
var mongoose = require('mongoose');
var CartFood = require('./models/cartfood');
var DashFood = require('./models/dashfood');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 访问静态资源
app.use(express.static(path.resolve(__dirname, '../dist')));

app.use('/login', login);
app.use('/system', system);
app.use('/operator', operator);
app.use('/consumer', consumer);

mongoose.connect('mongodb://127.0.0.1:27017/mypage');

// mongoose.connection.on('connected',function() {
//     console.log('MongoDB connected success');
// })

mongoose.connection.on('error',function() {
    console.log('MongoDB connected fail');
})

mongoose.connection.on('disconnected',function() {
    console.log('MongoDB connected disconnected');
})


// 监听
app.listen(3030, function () {
    console.log('success listen...3030');
    mongoose.connection.on('connected',function() {
        console.log('MongoDB connected success');
        var counttime = countdowntime();
        var timer = '';
        function countdowntime() {
            return function() {
                timer = setTimeout(counttime,1000)
                var myDate = new Date();
                var hour = myDate.getHours();
                var minute  = myDate.getMinutes();
                var second = myDate.getSeconds();
                console.log('hour:'+hour+'minute:'+minute+'second:'+second)
                if(hour == 23 && minute == 0 && second == 0) {
                    // clearTimeout(timer);
                
                    CartFood.remove(function(err,doc) {
                        if(err) {
                            console.log(err)
                        } else {
                            if(doc) {
                                console.log(doc)
                            }
                        }
                    })
                    DashFood.update({},{'$set':{num:0}},{multi:true},function(err,doc) {
                        if(err) {
                            console.log(err)
                        } else {
                            if(doc) {
                                console.log(doc)
                            }
                        }
                    })
                
            }
        }
    };
    counttime();})
});