var express = require('express');
var path = require('path');
var login = require('./routes/login');

var app = express();
// 访问静态资源
app.use(express.static(path.resolve(__dirname, '../dist')));

app.use('/login', login);

// 监听
app.listen(3030, function () {
    console.log('success listen...3030');
});