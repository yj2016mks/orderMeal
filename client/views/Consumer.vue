<template>
    <div class="body-wrap">
        <div class="header-wrap">
            <BaseNavHeader>
                <template slot='navbtn'>
                    <span v-if='auth'><router-link :to='{path:"/operator",query:{name:accountname}}'>后台管理</router-link></span>
                </template>
                <template slot='navbtn'>
                    <span><router-link to='/'><i class="iconfont icon-yonghutouxiang"></i></router-link></span>
                </template>
            </BaseNavHeader>
        </div>
        <div class="main-wrap">
            <div id="main">
                <div class="clear-float dash-tip">
                    <div class="fl dash-name">
                        <span class="name-head-max fl"><em>{{accountname | intercept}}</em></span>
                        <span class="hello-font">你好,{{accountname}}</span>
                    </div>
                    <div v-if='islasttime' class="fr dash-time"><span>订餐已结束</span></div>
                    <div v-else class="fr dash-time">
                        <span>订餐将于<em>{{deadlines}}</em>结束</span>
                        <span>剩余<em>{{countdown}}</em></span>
                    </div>
                </div>
                <div class="content-wrap clear-float">
                    <ul id = "foodList" class="dishes-content fl">
                        <li v-for='item in fooditems' v-bind:key='item.id'>
                            <div class="dash-img">
                                <img v-bind:src='item.imgurl'/>
                            </div>
                            <div class="dash-con">
                                <h5>{{item.seller}}{{item.name}}</h5>
                                <label>{{item.remark}}</label>
                                <div>
                                    <span>已售：{{item.salenum}}</span>
                                    <div class="addFirst" v-show='item.isaddfirst' v-on:click='addfirstitem(item)'>
                                        <span><i class="iconfont icon-jia"></i></span>
                                    </div>
                                    <div class="dash-num" v-show='!item.isaddfirst'>
                                        <span class="minusBtn" v-on:click='minusitem(item,"food")'><i class="iconfont icon-jian"></i></span>
                                        <span class="textNum">{{item.cartnum}}</span>
                                        <span class="addBtn rl" v-on:click='addnotfirstitem(item,"food")'><i class="iconfont icon-jia"></i></span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="cart-content fr">
                        <h5>订餐清单</h5>
                        <ul id="cartList">
                            <li v-for='item in cartitems' v-bind:key='item.id'>
                                <div>
                                    <span>{{item.seller}}{{item.name}}</span>
                                    <div class="dash-num">
                                        <span class="minusBtn" v-on:click='minusitem(item,"cart")'><i class="iconfont icon-jian"></i></span>
                                        <span class="textNum">{{item.cartnum}}</span>
                                        <span class="addBtn rl" v-on:click='addnotfirstitem(item,"cart")'><i class="iconfont icon-jia"></i></span>
                                    </div>
                                </div>
                                <div class="cart-note">
                                    <input type="text" class="remarkInput" placeholder="备注" v-bind:value='item.remark'>
                                </div>
                            </li>
                        </ul>
                        <button v-on:click='sublist()' class="subBtn"  v-bind:class='[islasttime?"bin-btn":"",{"bin-btn":nocartnum}]' type="button">提交订单</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Bus from '../router/bus.js'
export default {
    name: 'myitems',
    data () {
        return {
            accountname: '',
            auth: '',
            phone: '',
            islasttime: false,
            nocartnum: false,
            deadlines: '',
            countdown:'',
            fooditems: [],       //菜品数据
            cartitems: [],       //要提交的订单数据
            diffvalue: []        //记录订单原始数据和要提交的数量的差别
        }
    },
    created() {
        this.accountname = this.$route.query.name;
        this.auth = this.$route.query.auth;
        this.phone = this.$route.query.phone;
        this.getlist();      //加载已有菜品
        this.gettime();
    },
    methods: {
        gettime() {
            var counttime = countdowntime();
            var that = this;
            var diffms = '';
            var remindtime = '';   //订餐结束前提醒
            var timer = '';
            function countdowntime() {
                return function() {
                    clearTimeout(timer);
                    that.$http.get('/operator/getsystem').then((response) => {
                        if(response.data.status == 1) {
                            var result = response.data.result;
                            var opesystem = result.opesystem[0];
                            var deadlines = result.setTime;
                            
                            if(that.deadlines == '') {   //第一次请求
                                remindtime = opesystem.reminds[opesystem.remindchecked].name;
                                that.deadlines = deadlines;   //订餐截止时间
                                diffms = result.countdown;            //时间差(毫秒)
                            } else {
                                if(deadlines != that.deadlines) {    //截止时间和上次的不一致时，将截止时间、时间差更新
                                    that.deadlines = deadlines;
                                    diffms = result.countdown;
                                }
                                if(remindtime != opesystem.reminds[opesystem.remindchecked].name) {
                                    remindtime = opesystem.reminds[opesystem.remindchecked].name;
                                }
                            }
                            if(diffms <= 0) {
                                that.islasttime = true;
                                var difftime = '0时0分0秒';
                            } else{
                                var remindtimems = parseInt(remindtime)*60*1000;console.log(remindtimems);console.log(diffms);
                                if(remindtimems == diffms) {
                                    that.$layer.alert('离订餐截至还有' + remindtime + '分钟！');
                                }
                                diffms = diffms - 1000;
                                var seconds = Math.floor(diffms/1000%60);
                                var minutes = Math.floor(diffms/1000/60%60);
                                var hour = Math.floor(diffms/1000/60/60%60);
                                var difftime = hour + '时' + minutes + '分' + seconds + '秒';
                            }
                            that.countdown = difftime;      //倒计时时间
                            timer = setTimeout(counttime,1000)
                        }
                    })
                } 
            }
            counttime();
        },
        //菜品列表 
        getdashlish() {
            return new Promise((resolve, reject) => {
                var params = {
                    authority:true
                }
                this.$http.get('/operator/getdashlish',{params}).then((response) => {
                    if(response.data.status == 1) {
                        var result = response.data.result;
                        result.forEach(function(val,index) {
                            var orderarry = {};
                            orderarry.id = val._id;
                            orderarry.imgurl = val.imgurl;
                            orderarry.name = val.name;
                            orderarry.seller = val.seller;
                            orderarry.remark = val.remark;
                            orderarry.salenum = val.num;
                            orderarry.cartnum = 1;
                            orderarry.isaddfirst = true;
                            this.fooditems.push(orderarry);
                            var diffarry = {};
                            diffarry.id = val._id;
                            diffarry.value = 0;
                            this.diffvalue.push(diffarry);  //获取记录订单原始数据和要提交的数量的差别
                        },this)
                        resolve();
                    }
                })
            })
        },
        //订餐列表
        getcartlish() {
            var that = this;
            return new Promise((resolve, reject) => {
                var params = {
                    account:this.accountname
                }
                this.$http.get('/consumer/getcartlish',{params}).then((response) => {
                    if(response.data.status == 1) {
                        if(response.data.result.length != 0) {
                            var result = response.data.result[0];
                            this.cartitems = result.cartlist;
                            resolve();
                        }
                    }
                })
            })
        },
        getlist() {
            Promise.all([this.getdashlish(),this.getcartlish()])
                    .then((resolve) => {
                        this.fooditems.forEach((val,index) => {
                            this.cartitems.forEach(function(cartval,cartindex) {
                                if(cartval.id == val.id) {
                                    val.isaddfirst = false;
                                    val.cartnum = cartval.cartnum;
                                }
                            })
                        })
                        this.diffvalue.forEach((val,index) => {
                            this.cartitems.forEach((cartval,cartindex) => {
                                if(val.id == cartval.id) {
                                    val.value = cartval.cartnum;   //获取记录订单原始数据和要提交的数量的差别
                                }
                            })
                        })
                    })
        },
        // 添加第一个菜品
        addfirstitem(item) {
            if(this.islasttime == true) {
                alert('订餐已结束');
                return false;
            }
            item.isaddfirst = false;
            item.cartnum = 1;
            var cartarry = {};
            cartarry.id = item.id;
            cartarry.seller = item.seller;
            cartarry.name = item.name;
            cartarry.cartnum = item.cartnum;
            cartarry.remark = '';
            cartarry.showmakesure = true;
            this.cartitems.push(cartarry);
            this.nocartnum = false;
        },
        // 添加非第一个菜品
        addnotfirstitem(item,identifier) {
            if(this.islasttime == true) {
                alert('订餐已结束');
                return false;
            }
            item.cartnum ++;
            if(identifier == 'food') {
                for(var i = 0;i<this.cartitems.length;i++) {
                    if(this.cartitems[i].id == item.id) {
                        this.cartitems[i].cartnum ++;
                    }
                }
            } else if(identifier == 'cart'){
            for(var i = 0;i<this.fooditems.length;i++) {
                    if(this.fooditems[i].id == item.id) {
                        this.fooditems[i].cartnum ++;
                    }
                } 
            }
        },
        // 减去菜品
        minusitem(item,identifier) {
            if(this.islasttime == true) {
                alert('订餐已结束');
                return false;
            }
            var cartlen = this.cartitems.length;
            var foodLen = this.fooditems.length;
            if(item.cartnum <= 1) {
                if(identifier == 'food') {
                    item.isaddfirst = true;
                    for(var i = 0;i<cartlen;i++) {
                        if(this.cartitems[i].id == item.id) {
                            this.cartitems.splice(i,1);
                            cartlen--;
                            if(cartlen<1){
                                this.nocartnum = true;
                            }
                        }
                    }
                } else if(identifier == 'cart') {
                    for(var i = 0;i<cartlen;i++) {
                        if(this.cartitems[i].id == item.id) {
                            this.cartitems.splice(i,1);
                            cartlen--;
                            if(cartlen<1){
                                this.nocartnum = true;
                            }
                        }
                    }
                    for(var i = 0;i<foodLen;i++) {
                        if(this.fooditems[i].id == item.id) {
                            this.fooditems[i].isaddfirst = true;
                        }
                    }
                }
            } else {
                item.cartnum --;
                if(identifier == 'food') {
                    for(var i = 0;i<cartlen;i++) {
                        if(this.cartitems[i].id == item.id) {
                            this.cartitems[i].cartnum --;
                        }
                    }
                } else if(identifier == 'cart') {
                    for(var i = 0;i<foodLen;i++) {
                        if(this.fooditems[i].id == item.id) {
                            this.fooditems[i].cartnum --;
                        }
                    }
                }
            }
        },
        // 提交订单
        sublist() {
            if(this.islasttime == true) {
                this.$layer.msg('订餐已结束');
                return false;
            }
            if(this.nocartnum == true) {
                this.$layer.msg("请选择套餐");
                return false;
            }
            this.diffvalue.forEach((val,index) => {
                this.cartitems.forEach((cartval,cartindex) => {
                    if(val.id == cartval.id) {
                        var temp = cartval.cartnum - val.value;
                        val.value = temp;
                    }
                })
            })
            var submitDate = new Date(); 
            var params = {
                account: this.accountname,
                cartlist: this.cartitems,
                diffvalue: this.diffvalue,
                phone: this.phone,
                submitDate: submitDate
            };
            this.$http.post('/consumer/setcartfood',params).then((response) => {
                this.$layer.msg('订单提交成功！');
                this.fooditems.forEach((val,index) => {   //更新菜品上的已售
                    this.diffvalue.forEach((diffval,index) => {
                        if(val.id == diffval.id) {
                            val.salenum = val.salenum + diffval.value;
                        }
                    })
                })
                this.diffvalue.forEach((val,index) => {    //更新菜品上的购物车数量
                    this.cartitems.forEach((cartval,cartindex) => {
                        if(val.id == cartval.id) {
                            val.value = cartval.cartnum;
                        }
                    })
                })
            })
        }
    }
}
</script>
<style scoped src='../assets/css/consumer.css'>
</style>