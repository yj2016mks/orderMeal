<template>
    <div class="syst-set j-tab-con">
        <div class="deadlineTime clear-float line-height">
            <span>订餐截止时间</span>
            <ul class="clear-float">
                <li v-for='item in deadlines'>
                    <input v-model='deadchecked' v-bind:value='item.value' v-bind:id='item.name' type="radio" name="deadline">
                    <label v-bind:for='item.name'>{{item.name}}</label>
                </li>
            </ul>
        </div>
        <div class="remindTime clear-float line-height">
            <span>订餐结束前提醒</span>
            <ul class="clear-float">
                <li v-for='item in reminds'>
                    <input v-model='remindchecked' v-bind:value='item.value' v-bind:id='item.name' type="radio" name="remind">
                    <label v-bind:for='item.name'>{{item.name}}分钟</label>
                </li>
            </ul>
        </div>
        <div class="remindSwitch line-height">
            <span>订餐信息提醒</span>
            <BaseSwitchBtn></BaseSwitchBtn>
            <div class="margt-max"><button v-on:click='btnenter' class="confirm-btn configconfirm" type='button'>保存</button></div>
        </div>
    </div>
</template>

<script>
import Bus from '../router/bus.js'

export default {
    name:'ManagementOrder',
    data() {
        return {
            deadchecked: 0,
            remindchecked: 0,
            authority: true,
            deadlines: [],
            reminds: []
        }
    },
    created() {
        Bus.$on('switchchange',(authority) => {
            this.authority = authority;
        })
    },
    mounted() {
        this.getsystem()
    },
    methods: {
        getsystem() {
            this.$http.get('/operator/getsystem').then((response) => {
                if(response.data.status == 1) {
                    var result = response.data.result.opesystem[0];
                    this.deadchecked = result.deadchecked,
                    this.remindchecked = result.remindchecked,
                    this.authority = result.authority,
                    this.deadlines = result.deadlines,
                    this.reminds = result.reminds
                }
            })
        },
        btnenter() {
            var params = {
                deadchecked:this.deadchecked,
                remindchecked:this.remindchecked,
                authority:this.authority,
                deadlines:this.deadlines,
                reminds:this.reminds
            }
            this.$http.post('/operator/setsystem',params).then((response) => {
                if(response.data.status == 1) {
                    this.$layer.closeAll();
                    this.$layer.msg("保存成功");
                    Bus.$emit('countdown');
                }
            })
        }
    }
}
</script>