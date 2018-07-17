<template>
    <div class="body-wrap">
        <div class="header-wrap">
            <header>
                <div class="head-logo"><i class="iconfont icon-yonghutouxiang"></i></div>
                <div class="head-btn">
                    <span v-if='usertype' onclick="javaScript:window.location.href='${ctx}/operator/index'">后台管理</span>
                    <span v-else><router-link to='/'><i class="iconfont icon-yonghutouxiang"></i></router-link></span>
                </div>
            </header>
        </div>
        <div class="main-wrap">
            <div id="main">
                <div class="clear-float dash-tip">
                    <div class="fl dash-name">
                        <span class="name-head-max fl"><em>{{intercept}}</em></span>
                        <span class="hello-font">你好,{{username}}</span>
                    </div>
                    <div v-if='islasttime' class="fr dash-time"><span>订餐已结束</span></div>
                    <div v-else class="fr dash-time"><span>订餐将于<em>{{lasttime}}</em>结束</span></div>
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
                                    <span>已售：{{item.quantity}}</span>
                                    <div class="addFirst" v-show='item.isaddfirst' v-on:click='addfirstitem(item)'>
                                        <span><i class="iconfont icon-custom-add"></i></span>
                                    </div>
                                    <div class="dash-num" v-show='!item.isaddfirst'>
                                        <span class="minusBtn" v-on:click='minusitem(item,"food")'><i class="iconfont icon-jiansvg"></i></span>
                                        <span class="textNum">{{item.num}}</span>
                                        <span class="addBtn rl" v-on:click='addnotfirstitem(item,"food")'><i class="iconfont icon-custom-add"></i></span>
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
                                        <span class="minusBtn" v-on:click='minusitem(item,"cart")'><i class="iconfont icon-jiansvg"></i></span>
                                        <span class="textNum">{{item.num}}</span>
                                        <span class="addBtn rl" v-on:click='addnotfirstitem(item,"cart")'><i class="iconfont icon-custom-add"></i></span>
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
export default {
  name: 'HelloWorld',
  data () {
    return {
        username:'',
        usertype:false,
        islasttime:false,
        nocartnum:false,
        lasttime:'18:30',
        fooditems:[{
            id:1,
            isaddfirst:true,
            imgurl:'/static/images/超意兴一.jpg',
            seller:'超意兴',
            name:'把子肉套餐一',
            remark:'美味面条',
            quantity:'0',
            num:'1'
        },{
            id:2,
            isaddfirst:true,
            imgurl:'/static/images/超意兴二.jpg',
            seller:'超意兴',
            name:'把子肉套餐二',
            remark:'高蛋白保证一天能量',
            quantity:'2',
            num:'2' 
        },{
            id:3,
            isaddfirst:true,
            imgurl:'/static/images/超意兴二.jpg',
            seller:'超意兴',
            name:'把子肉套餐三',
            remark:'高蛋白保证一天能量',
            quantity:'2',
            num:'2' 
        }],
        cartitems:[]
    }
  },
 mounted() {
    this.username = this.$route.query.name;
  },
  computed:{
      intercept: function() {
          return this.username.split('')[0];
      }
  },
  methods: {
      addfirstitem(item) {
        if(this.islasttime == true) {
            alert('订餐已结束');
            return false;
        }
        item.isaddfirst = false;
        item.num = 1;
        var cartarry = {};
        cartarry.id = item.id;
        cartarry.seller = item.seller;
        cartarry.name = item.name;
        cartarry.num = item.num;
        this.cartitems.push(cartarry);
        this.nocartnum = false;
      },
      addnotfirstitem(item,identifier) {
        if(this.islasttime == true) {
            alert('订餐已结束');
            return false;
        }
        item.num ++;
        if(identifier == 'food') {
            for(var i = 0;i<this.cartitems.length;i++) {
                if(this.cartitems[i].id == item.id) {
                    this.cartitems[i].num ++;
                }
            }
        } else if(identifier == 'cart'){
           for(var i = 0;i<this.fooditems.length;i++) {
                if(this.fooditems[i].id == item.id) {
                    this.fooditems[i].num ++;
                }
            } 
        }
      },
      minusitem(item,identifier) {
        if(this.islasttime == true) {
            alert('订餐已结束');
            return false;
        }
        var cartlen = this.cartitems.length;
        var foodLen = this.fooditems.length;
        if(item.num <= 1) {
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
            item.num --;
            if(identifier == 'food') {
                for(var i = 0;i<cartlen;i++) {
                    if(this.cartitems[i].id == item.id) {
                        this.cartitems[i].num --;
                    }
                }
            } else if(identifier == 'cart') {
                for(var i = 0;i<foodLen;i++) {
                    if(this.fooditems[i].id == item.id) {
                        this.fooditems[i].num --;
                    }
                }
            }
        }
      },
      sublist() {
        if(this.islasttime == true) {
            alert('订餐已结束');
            return false;
        }
        if(this.nocartnum == true) {
            alert("请选择套餐");
            return false;
        }
        alert('订单提交成功！');
        // this.$http.post('/cartitems',cartitems).then((response) => {
        //     console.log(response);
        // })
      }
  }
}
</script>
<style src='../assets/css/consumer.css'>
</style>