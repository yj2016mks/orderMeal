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
            
            <li v-for='item in orderitems' v-bind:key='item.id'>
                <div>
                    <div class="dash-img">
                        <img v-bind:src="item.imgurl">
                    </div>
                    <div class="dash-con">
                        <h5>{{item.foodname}}{{item.seller}}</h5>
                        <label>{{item.remark}}</label>
                        <div>
                            <span>已售：{{item.num}}'+12+'</span>
                        </div>
                    </div>
                </div>
                <div class="operaWrap" data-state="'+datastate+'">
                    <span class="binBtn"><i class="iconfont icon-pause" title="下架"></i></span>
                    <span class="openBtn" title="上架"><i class="iconfont icon-sale"></i></span>
                    <span class="delBtn" title="删除"><i class="iconfont icon-delete"></i></span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import NewDash from './NewDash'

export default {
    name:'ManagementFood',
    data() {
        return {}
    },
    comments: {
        NewDash
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
        }
    }
}
</script>