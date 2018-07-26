<template>
    <div class="body-wrap">
        <div class="header-wrap">
            <BaseNavHeader>
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
                    <div v-else class="fr dash-time"><span>订餐将于<em>{{lasttime}}</em>结束</span></div>
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
    export default {
        name:'newdash',
        data() {
            return {
               accountname: 'operator' ,
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
        methods: {

        }
    }
</script>
<style src='../assets/css/operator.css'>
</style>