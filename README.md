## 前言

>最近自学vue，将以前一个jq订餐系统改为vue的。
>不同角色登录不同的页面，分为管理员、操作员、订餐人员，操作员能订餐。管理员的账户是直接从数据库写入的。

## 技术栈
>vue2 + vue-router + bus + webpack + express + mongoose

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 搭建vue项目

``` bash
创建基于webpack模版的项目
vue init webpack mypage

安装包依赖并运行
cd firstapp
npm install
npm run dev
```
## 集成express
``` bash
修改文件结构
将src文件夹修改为client
将webpack.base.conf.js内的src地址修改为client

根目录下新建一个文件夹，命名为server

server目录下新建一个文件，命名为app.js

安装express
npm install express --save

server目录下新建一个文件夹，命名为routes，新建文件login.js
```


## 打包运行
``` bash
npm run build
node server/app.js
```
