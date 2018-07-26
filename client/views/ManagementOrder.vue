<template>
    <div class="order-process j-tab-con">
        <ul id="order-list" class="clear-float">
            <li v-for='item in orderitems' v-bind:key='item.id'>
                <div>
                    <div class="dash-img">
                        <img v-bind:src="item.imgurl"/>
                        <div class="dash-title">
                            <span>{{item.num}}</span>
                            <span>{{item.foodname}}{{item.seller}}</span>
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
                <h6>全部订单</h6><span></span>
                <div id="search" class="fr">
                    <input id="searchOrderText" type="text" class="searchStr">
                    <i id="searchOrder" class="iconfont icon-search search-btn"></i>
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
                        <td>{{item.foodname}}{{item.seller}}</td>
                        <td>{{item.num}}</td>
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
            orderitems:[{
                imgurl:'/static/images/超意兴二.jpg',
                foodname:'超意兴',
                seller:'套餐一',
                remark:'不要辣',
                num:12,
                shownotice:false,
                shownoticebefore:true
            },{
                imgurl:'/static/images/超意兴二.jpg',
                foodname:'超意兴',
                seller:'套餐二',
                remark:'不要辣',
                num:11,
                shownotice:true,
                shownoticebefore:true
            }],
            orderusers:[{
                name:'system',
                foodname:'超意兴',
                seller:'套餐一',
                num:12,
                createTime:'17:30',
                phone:'1114444',
                remark:'不要辣',
                showmakesure:true
            },{
                name:'yang',
                foodname:'超意兴',
                seller:'套餐一',
                num:12,
                createTime:'17:30',
                phone:'1114444',
                remark:'不要辣',
                showmakesure:true
            },{
                name:'liu',
                foodname:'超意兴',
                seller:'套餐二',
                num:12,
                createTime:'17:30',
                phone:'1114444',
                remark:'要辣',
                showmakesure:false
            }]
        }
    },
    methods: {
        makesure(item) {
            item.showmakesure = false;
        },
        notice(item) {
            this.$layer.confirm("是否通知取餐", {
                btn: ["确定","取消"] //按钮
            }, () => {
                item.shownoticebefore = false;
                this.$layer.closeAll();
            });
        }
    }
}
</script>