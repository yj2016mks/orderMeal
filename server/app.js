var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var login = require('./routes/login');
var system = require('./routes/system');
var operator = require('./routes/operator');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 访问静态资源
app.use(express.static(path.resolve(__dirname, '../dist')));

app.use('/login', login);
app.use('/system', system);
app.use('/operator', operator);

// 监听
app.listen(3030, function () {
    console.log('success listen...3030');
});