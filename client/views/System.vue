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
                <div class="opera-wrap clear-float">
                    <span class="hello-font">你好，{{accountname}}</span>
                    <div class="opera-btn">
                        <span class="searchBtn rltv" v-bind:class='{barstretch:isbarstretch,barfewer:isbarfewer}' v-on:mouseenter='searchbarstretch' v-on:mouseleave='searchbarfewer'>
                            <input type="text" id="searchStr" v-model='searchstr'/>
                            <em class="iconfont icon-search" v-on:click='getList(0)'></em>
                        </span>
                        <span class="iconfont icon-jia" v-on:click='userpop'></span>
                    </div>
                </div>
                <div>
                    <table id="nameData">
                        <thead>
                            <tr>
                                <th width="80px"></th>
                                <th>姓名</th>
                                <th>手机号</th>
                                <th>平台账号</th>
                                <th>权限</th>
                                <th>备注</th>
                                <th width="80px">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for='item in consumers' v-bind:key='item.id'>
                                <td>
                                    <span><em>{{item.name | intercept}}</em></span>
                                </td>
                                <td>{{item.name}}</td>
                                <td>{{item.phone}}</td>
                                <td>{{item.account}}</td>
                                <td>{{item.authority}}</td>
                                <td>{{item.remark}}</td>
                                <td>
                                    <div>
                                        <span title='删除'><i class='iconfont icon-delete'></i></span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NewUser from './NewUser'

export default {
    name: 'system',
    data () {
        return {
            accountname:'system',
            isbarstretch:false,
            isbarfewer:false,
            searchstr:'',
            start:0,
            consumers:[]
        }
    },
    components:{
        NewUser
    },
    mounted() {
        this.getList(0);
    },
    methods: {
        searchbarstretch() {
            this.isbarstretch = true;
        },
        searchbarfewer() {
            if(this.searchstr.length >= 1) {
                this.isbarstretch = false;
                this.isbarfewer = true;
            } else {
                this.isbarstretch = true;
                this.isbarfewer = false;
            }
        },
        userpop() {
            this.$layer.iframe({
                content: {
                    content : NewUser,
                    parent: this,
                    data:{'hid':false}
                },
                area : ['800px','480px'],
                title : '添加用户'
            })
        },
        getList(type) {
            if (0==type) {
                this.start = 0;
            }
            var start = this.start;
            var searchstr = this.searchstr;
            var params = {start:start,length:10,searchStr:searchstr}
            this.$http.get('/system',{params}).then((response)=>{
                if(response.data.status == 1) {
                    var searchresult = response.data.result;console.log(searchresult);
                    this.consumers = searchresult;
                }
            })
            // $.ajax({
            //     type: 'get',
            //     url: ctx + '/user/list?start='+start+'&length='+length+'&searchStr='+encodeURI(encodeURI($("#searchStr").val())),
            //     dataType: "json",
            //     beforeSend: function() {},
            //     success: function (msg) {
                
            //         count = msg.recordsTotal;
            //         start += length;
            //         var listhtml='';
            //         $.each(msg.data, function(index, el) {
            //             var phone =isNull(el.phone)?"--":el.phone;
            //             var remark =isNull(el.remark)?"--":el.remark;
            //             var type ='普通用户';
            //             if (el.type==1) {
            //                 type='行政人员'
            //             }
            //             var tmp = "<tr data-id="+el.id+" ><td><span><em>"+el.name.substring(0,1)+"</em></span></td>"+
            //                 "<td>"+el.name+"</td>"+
            //                 "<td>"+phone+"</td>"+
            //                 "<td>"+el.userName+"</td>"+
            //                 "<td>"+type+"</td>"+
            //                 "<td>"+remark+"</td>"+
            //                 "<td class='table-opeta'><div>"+
            //                         "<span title='删除'><i class='iconfont icon-delete'></i></span>"+
            //                 "</div></td></tr>";
            //             listhtml += tmp;
            //         });
            //         if(0==type) {
            //             $("#nameData tbody").html(listhtml);
            //         } else {
            //             $("#nameData tbody").append(listhtml);
            //         }
            //         if (count > start) {
            //             //还可以拉
            //             window.onscroll = function () {
            //                 // console.log("1:" + $(document).scrollTop());
            //                 //  console.log(window.innerHeight);//在谷歌浏览器中请使用 innerHeight以替换clientHeight
            //                 //  console.log($(document).scrollTop());
            //                 //  console.log(document.body.scrollHeight);//以上三个属性打印出来之后当滚动条滚到底部 1 + 2 = 3。
            //                     if(window.innerHeight + $(document).scrollTop() == document.body.scrollHeight){
            //                         getList(1);
            //                     }
            //                 };
            //         } else {
            //             //已经到底
            //         }
            //     },
            //     error: function(e) {}
            // });
        }
    }
}
</script>
<style src='../assets/css/system.css'>
</style>