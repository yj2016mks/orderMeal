<template>
    <div class="food-mange j-tab-con clear-float">
        <ul id="dash-list" class="dishes-content fl">
            <li id = 'addli'>
                <div v-on:click='addnewdash' id="addDash" class="rltv">
                    <div class="vertical-sty">
                        <i class="iconfont icon-add"></i>
                        <span>新建菜品</span>
                    </div>
                </div>
            </li>
            <li v-for='item in orderitems' v-bind:key='item.id' v-bind:class='{"mask-shadow":item.showshadow}' v-on:mouseenter='operatfood(item)' v-on:mouseleave='operatfoodleave(item)'>
                <div>
                    <div class="dash-img">
                        <img v-bind:src="item.imgurl">
                    </div>
                    <div class="dash-con">
                        <h5>{{item.name}}{{item.seller}}</h5>
                        <label>{{item.remark}}</label>
                        <div>
                            <span>已售：{{item.num}}</span>
                        </div>
                    </div>
                </div>
                <div class="operaWrap" v-bind:class='{hid:item.ishid}'>
                    <span v-if='item.authority' v-on:click='openfood(item)' class="openBtn" title="上架"><i class="iconfont icon-dui"></i></span>
                    <span v-else v-on:click='binfood(item)' class="binBtn"><i class="iconfont icon-jinzhi" title="下架"></i></span>
                    <span v-on:click='delfood(item)' class="delBtn" title="删除"><i class="iconfont icon-delete"></i></span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import NewDash from './NewDash'
import Bus from '../router/bus.js'

export default {
    name:'ManagementFood',
    data() {
        return {
            orderitems: []
        }
    },
    created() {
        Bus.$on('afreshdashList',(item) => {    //添加菜品
            this.orderitems.push(item);
        })
    },
    comments: {
        NewDash
    },
    mounted() {
        this.getdashlish();   //加载已有菜品
    },
    methods: {
        addnewdash() {
            this.$layer.iframe({
                title: "新建菜品",
                area: ['510px', '680px'],
                content: {
                    content: NewDash,
                    parent: this,
                    data: {}
                }
            });
        },
        getdashlish() {
            this.$http.get('/operator/getdashlish').then((response) => {
                if(response.data.status == 1) {
                    var result = response.data.result;
                    result.forEach(function(val,index) {
                        var orderarry = {};
                        orderarry.id = val._id;
                        orderarry.imgurl = val.imgurl;
                        orderarry.name = val.name;
                        orderarry.seller = val.seller;
                        orderarry.remark = val.remark;
                        orderarry.num = val.num;
                        orderarry.authority = val.authority;
                        orderarry.showshadow = false;
                        orderarry.ishid = true;
                        this.orderitems.push(orderarry);
                    },this)
                }
            })
        },
        operatfood(item) {    //鼠标划过菜品
            item.showshadow = true;
            item.ishid = false;
            if(item.authority) {//为1时是已经下架状态
                item.authority = true;
            } else {
                item.authority = false;
            }
        },
        operatfoodleave(item) {
            item.showshadow = false;
            item.ishid = true;
        },
        openfood(item) {   //上架菜品
            this.$layer.confirm("是否上架该菜品", {
                btn: ["确定","取消"] //按钮
            }, () => {
                var params = {
            	    id: item.id,
                    authority: !item.authority
                }
                this.$http.post('/operator/food/statuschange',params).then((response) => {
                    if(response.data.status == 1) {
                        this.$layer.closeAll();
                        this.$layer.msg("已上架该菜品");
                        item.authority = false;
                    }
                })
            });
        },
        binfood(item) {    //下架菜品
            this.$layer.confirm("是否下架该菜品", {
                btn: ["确定","取消"] //按钮
            }, () => {
                var params = {
            	    id: item.id,
                    authority: !item.authority
                }
                this.$http.post('/operator/food/statuschange',params).then((response) => {
                    if(response.data.status == 1) {
                        this.$layer.closeAll();
                        this.$layer.msg("已下架该菜品");
                        item.authority = true;
                    }
                })
            });
        },
        delfood(item) {    //删除菜品  
            this.$layer.confirm("是否删除该菜品", {
                btn: ["确定","取消"] //按钮
            }, () => {
            	var params = {
            	    id: item.id
                }
                this.$http.post('/operator/food/deldash',params).then((response) => {
                    if(response.data.status == 1) {
                        this.$layer.closeAll();
                        this.$layer.msg("该菜品已删除");
                        
                        this.orderitems.forEach((val,index) => {
                            if(item.id == val.id) {
                                this.orderitems.splice(index,1);
                                return false;
                            }
                        })
                        console.log(this.orderitems)
                    }
                })
            });
        }
    }
}
</script>