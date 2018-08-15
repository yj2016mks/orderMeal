<template>
    <div class="body-wrap">
        <div class="header-wrap">
            <BaseNavHeader>
                <template slot='navbtn'>
                    <span v-if='auth'><router-link :to='{path:"/consumer",query:{name:accountname,auth:auth}}'>去订餐</router-link></span>
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
                        <span class="hello-font">你好，{{accountname}}</span>
                    </div>
                    <div v-if='islasttime' class="fr dash-time"><span>订餐已结束</span></div>
                    <div v-else class="fr dash-time">
                        <span>订餐将于<em>{{deadlines}}</em>结束</span>
                        <span>剩余<em>{{countdown}}</em></span>
                    </div>
                </div>
                <div class="tabswitch-wrap">
                    <ul class='tab-switch clear-float'>
                    <li
                        v-for="tab in tabs"
                        v-bind:class="{ active: currentTab === tab.name }"
                        v-on:click="currentTab = tab.name"
                    >{{ tab.value }}</li>
                    </ul>
                    <component
                        v-bind:is="currentTabComponent"
                    ></component>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ManagementSystem from './ManagementSystem'
    import ManagementFood from './ManagementFood'
    import ManagementOrder from './ManagementOrder'
    import Bus from '../router/bus.js'

    export default {
        name:'newdash',
        data() {
            return {
                diffms:0,
                deadlines:'',
                countdown:'',
                islasttime:'',
                accountname: '' ,
                auth: '',
                timer: '',
                currentTab: 'ManagementOrder',
                tabs: [{
                            name: 'ManagementOrder',
                            value: '订单管理'
                    },{
                            name: 'ManagementFood',
                            value: '菜品管理'
                    },{
                            name: 'ManagementSystem',
                            value: '系统设置'
                    }]
            }
        },
        created() {
            this.accountname = this.$route.query.name;
            this.auth = this.$route.query.auth;
            this.gettime();
            Bus.$on('countdown',() => {
                this.gettime();
            })
        },
        components: {
            ManagementOrder,
            ManagementFood,
            ManagementSystem
        },
        computed: {
            currentTabComponent: function () {
                return this.currentTab;
            }
        },
        mounted() {
        },
        methods: {
            gettime() {
                this.$http.get('/operator/getsystem').then((response) => {
                    if(response.data.status == 1) {
                        var result = response.data.result;
                        var opesystem = result.opesystem[0];
                        this.deadlines = opesystem.deadlines[opesystem.deadchecked].name;   //订餐截止时间
                        var diffms = result.countdown;
                        var counttime = countdowntime();
                        var that = this;
                        function countdowntime() {
                            return function() {
                                clearTimeout(that.timer);
                                if(diffms <= 0) {
                                    that.islasttime = true;
                                    var difftime = '0时0分0秒';
                                } else{
                                    diffms = diffms - 1000;
                                    var seconds = Math.floor(diffms/1000%60);
                                    var minutes = Math.floor(diffms/1000/60%60);
                                    var hour = Math.floor(diffms/1000/60/60%60);
                                    var difftime = hour + '时' + minutes + '分' + seconds + '秒';
                                }
                                that.countdown = difftime;      //倒计时时间
                                that.timer = setTimeout(counttime,1000)
                            }
                        };
                        counttime();
                    }
                })
            }
        }
    }
</script>
<style src='../assets/css/operator.css'>
</style>