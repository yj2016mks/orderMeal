<template>
    <div class="body-wrap">
        <div class="header-wrap">
            <header>
                <div class="head-logo"><i class="iconfont icon-yonghutouxiang"></i></div>
                <div class="head-btn">
                    <span v-if='usertype' onclick="javaScript:window.location.href='${ctx}/operator/index'">后台管理</span>
                    <span v-else><a href="${ctx}/logout"><i class="iconfont icon-yonghutouxiang"></i></span></a>
                </div>
            </header>
        </div>
        <div class="main-wrap">
            <div id="main">
                <div class="clear-float dash-tip">
                    <div class="fl dash-name">
                        <span class="name-head-max fl"><em>{{username}}</em></span>
                        <span class="hello-font">你好{{username}}</span>
                    </div>
                    <div v-if='islasttime' class="fr dash-time"><span>订餐将于<em>{{lasttime}}</em>结束</span></div>
                    <div v-else class="fr dash-time"><span>订餐已结束</span></div>
                </div>
                <div class="content-wrap clear-float">
                    <ul id = "foodList" class="dishes-content fl">
                        <li v-for='item in fooditems'>
                            <div class="dash-img">
                                <img v-bind:src='item.imgurl'/>
                            </div>
                            <div class="dash-con">
                                <h5>{{item.seller}}{{item.name}}</h5>
                                <label>{{item.remark}}</label>
                                <div>
                                    <span>已售：{{item.quantity}}</span>
                                    <div class="addFirst">
                                        <span><i class="iconfont icon-custom-add"></i></span>
                                    </div>
                                    <div class="dash-num">
                                        <span class="minusBtn"><i class="iconfont icon-jiansvg"></i></span>
                                        <span class="textNum">1</span>
                                        <span class="addBtn rl"><i class="iconfont icon-custom-add"></i></span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="cart-content fr">
                        <h5>订餐清单</h5>
                        <ul id="cartList">
                            <li v-for='item in cartitems'>
                                <div>
                                    <span>{{item.cartseller}}{{item.cartname}}</span>
                                    <div class="dash-num">
                                        <span class="minusBtn"><i class="iconfont icon-jiansvg"></i></span>
                                        <span class="textNum">{{item.cartnum}}</span>
                                        <span class="addBtn rl"><i class="iconfont icon-custom-add"></i></span>
                                    </div>
                                </div>
                                <div class="cart-note">
                                    <input type="text" class="remarkInput" placeholder="备注" v-bind:value='item.cartremark'>
                                </div>
                            </li>
                        </ul>
                        <button v-if='islasttime' class="subBtn" type="button">提交订单</button>
                        <button v-else class="subBtn bin-btn" type="button">提交订单</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
        usertype:true,
        islasttime:true,
        lasttime:'18:30',
        fooditems:[{
            imgurl:'/static/images/超意兴一.jpg',
            seller:'超意兴',
            name:'把子肉套餐一',
            remark:'美味面条',
            quantity:'0',
            num:'2'
        },{
            imgurl:'/static/images/超意兴二.jpg',
            seller:'超意兴',
            name:'把子肉套餐二',
            remark:'高蛋白保证一天能量',
            quantity:'2',
            num:'2' 
        }],
        cartitems:[{
            cartseller:'超意兴',
            cartname:'把子肉套餐一',
            cartnum:'4',
            cartremark:'不要鸡蛋'
        },{
            cartseller:'超意兴',
            cartname:'把子肉套餐二',
            cartnum:'4',
            cartremark:'要辣椒'
        }]
    }
  },
  methods: {

  }
}
</script>
<style src='../assets/css/consumer.css'>
</style>