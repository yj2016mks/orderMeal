<template>
    <div class="order-process j-tab-con">
        <ul id="order-list" class="clear-float">
            <li v-for='item in orderitems' v-bind:key='item.id' v-bind:class='{active:item.active}'>
                <div>
                    <div v-on:click='swtichnav(item)' class="dash-img">
                        <img v-bind:src="item.imgurl"/>
                        <div class="dash-title">
                            <span>{{item.num}}</span>
                            <span>{{item.seller}}{{item.foodname}}</span>
                        </div>
                    </div>
                    <div class="notice-div">
                        <div v-if='item.shownotice'>
                            <span v-if='item.shownoticebefore' v-on:click='notice(item)' class="notice-before" title="发送通知"><i class="iconfont icon-icon--"></i></span>
                            <span v-else class="notice-after">已通知</span>
                        </div>
                        <span v-else title="订餐尚未结束"><i class="iconfont icon-icon-- icon-icon-bin"></i></span>
                    </div>
                </div>
            </li>
        </ul>
        <div class="orderlist-wrap">
            <div class="orderlist-title">
                <h6 v-on:click='navall'>全部订单</h6><span>{{checknav}}</span>
                <div id="search" class="fr">
                    <input v-on:keyup.enter='getcartlish("name")' v-model='searchstr' id="searchOrderText" type="text" class="searchStr">
                    <i v-on:click='getcartlish("name")' id="searchOrder" class="iconfont icon-search search-btn"></i>
                </div>
            </div>
            <table id="orderList">
                <thead>
                    <tr>
                        <th width="80px"></th>
                        <th>姓名</th>
                        <th>菜品</th>
                        <th>数量</th>
                        <th>下单时间</th>
                        <th>手机号</th>
                        <th>备注</th>
                        <th width="100px">状态</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for='item in orderusers' v-bind:key='item.id'>
                        <td><span><em>{{item.name | intercept}}</em></span></td>
                        <td>{{item.name}}</td>
                        <td>{{item.seller}}{{item.cartname}}</td>
                        <td>{{item.cartnum}}</td>
                        <td>{{item.createTime}}</td>
                        <td>{{item.phone}}</td>
                        <td>{{item.remark}}</td>
                        <td class="table-opeta">
                            <div>
                                <button v-if='item.showmakesure' v-on:click='makesure(item)' class="makeSure" type="button">确认取餐</button>
                                <span v-else>已取餐</span>
                        	</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    name:'ManagementSystem',
    data() {
        return {
            searchstr:'',
            checknav:'',
            orderitems:[],
            orderusers:[]
        }
    },
    mounted() {
        this.getdashlish();   //加载已有菜品
        this.getcartlish();   //加载购物清单
    },
    methods: {
        makesure(item) {console.log(item)
            var params = {
                accountid:item.accountid,
                cartid:item.cartid
            }
            console.log(params)
            this.$http.post('/consumer/makesure',params).then((response) => {
                if(response.data.status == 1) {
                    item.showmakesure = false;
                }
            })
        },
        getdashlish() {
            var params = {
                authority:true,
                num:0
            }
            this.$http.get('/operator/getdashlish',{params}).then((response) => {
                if(response.data.status == 1) {
                    var result = response.data.result;
                    result.forEach(function(val,index) {
                        var dashrarry = {};
                        dashrarry.id = val._id;
                        dashrarry.imgurl = val.imgurl;
                        dashrarry.foodname = val.name;
                        dashrarry.seller = val.seller;
                        dashrarry.remark = val.remark;
                        dashrarry.num = val.num;  
                        dashrarry.shownotice = true;
                        dashrarry.shownoticebefore = val.shownoticebefore;
                        dashrarry.active = false;
                        this.orderitems.push(dashrarry);
                    },this)
                }
            })
        },
        getcartlish(param,item) {
            if(param == 'name') {
                if(this.searchstr.length > 0) {
                    var params = {account:this.searchstr}
                } else {
                    var params = {}
                }
            } else if(param == 'food') {
                var params = {
                    param:'food',
                    seller:item.seller,
                    name:item.foodname
                } 
            } else {
                var params = {}
            }
            this.$http.get('/consumer/getcartlish',{params}).then((response) => {
                if(response.data.status == 1) {
                    this.orderusers = [];
                    var result = response.data.result;
                    result.forEach(function(val,index) {
                        val.cartlist.forEach((cartval,cartindex) => {
                            var cartarry = {};
                            cartarry.accountid = val._id;
                            cartarry.name = val.account;
                            cartarry.phone = val.phone;
                            cartarry.createTime = val.submitDate;
                            cartarry.cartid = cartval.id;
                            cartarry.cartname = cartval.name;
                            cartarry.seller = cartval.seller;
                            cartarry.remark = cartval.remark;
                            cartarry.cartnum = cartval.cartnum;
                            cartarry.showmakesure = cartval.showmakesure;
                            this.orderusers.push(cartarry);
                        },this);
                    },this)
                }
            })
        },
        swtichnav(item) {
            if(item.active != true) {
                this.orderitems.forEach((val,index)=> {
                    val.active = false;
                })
                item.active = true;
                this.checknav = '/' + item.seller + item.foodname;
                this.getcartlish('food',item);
            } else {
                item.active = false;
                this.checknav = '';
                this.getcartlish();
            }
            
        },
        navall() {
            this.orderitems.forEach((val,index)=> {
                val.active = false;
            })
            this.checknav = '';
            this.getcartlish();
        },
        notice(item) {
            this.$layer.confirm("是否通知取餐", {
                btn: ["确定","取消"] //按钮
            }, () => {
                var params = {
                    id:item.id
                }
                this.$http.get('/operator/updatedashlish',{params}).then((response) => {
                    if(response.data.status == 1) {
                        item.shownoticebefore = false;
                        this.$layer.closeAll();
                    }
                })
                
            });
        }
    }
}
</script>