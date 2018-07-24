<template>
    <div id="addUseDiv" v-bind:class='{hid:hid}'>
        <ul>
            <input type="hidden" name="type" id="type"/>
            <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
            
            <li>
                <BaseInputText>
                    <template slot='necessary'>*</template>
                    <template slot='labelname'>姓名</template>
                    <template slot='labelinput'>
                        <input v-model.trim='name' v-on:keyup='syschronousval' id = "name" name = "name" type="text" maxlength="30" placeholder="员工真实姓名"/>
                    </template>
                </BaseInputText>
            </li>
            <li>
                <BaseInputText>
                    <template slot='necessary'></template>
                    <template slot='labelname'>手机号</template>
                    <template slot='labelinput'>
                        <input v-model='phone' id = "phone" name = "phone" type="text" maxlength="30" placeholder="员工联系方式"/>
                    </template>
                </BaseInputText>
            </li>
            <li>
                <BaseInputText>
                    <template slot='necessary'>*</template>
                    <template slot='labelname'>账号/密码</template>
                    <template slot='labelinput'>
                        <input v-model='account' id = "account" name = "account" readonly="readonly" type="text" placeholder="账号初始密码相同" maxlength="30"/>
                    </template>
                </BaseInputText>
            </li>
            <li>
                <BaseSwitchBtn v-on:switchchange='switchauthority(authority)'>操作员权限</BaseSwitchBtn>
            </li>
            <li>
                <BaseInputText>
                    <template slot='labelname'>备注</template>
                    <template slot='labelinput'>
                        <input v-model='remark' id = "remark" name = "remark" type="text" maxlength="30" placeholder="最多三十个字符"/>
                    </template>
                </BaseInputText>
            </li>
        </ul>
        <BaseDefaultBtn>
            <template slot='defaultbtn'>
                <button type="button" class="confirm-btn" v-on:click='btnenter'>确定</button>
            </template>
        </BaseDefaultBtn>
    </div>
</template>

<script>
import Bus from '../router/bus.js'

export default {
    name: 'userpop',
    data () {
        return {
            name: '',
            phone: '',
            account: '',
            authority: 0,
            remark: ''
        }
    },
    methods: {
        switchauthority(authority) {
            this.authority = authority;
        },
        syschronousval() {
            this.account = this.name;
        },
        btnenter() {
            function nameSupport(name) {
                var reg = /^[\u4e00-\u9fa5]+$/;
                if (reg.test(name)){
                    return true;
                }
                return false;
            }
            var name = this.name;
            if(name.length <=0) {
                this.$layer.msg("请填写姓名");
                return false;
            }
            if(!nameSupport(name)) {
                this.$layer.msg("姓名必须为汉字");
                return false;
            }
            if(!(name.length>=2 && name.length<=5)) {
                this.$layer.msg("姓名长度为2-5");
                return false;
            }
            var params = {
                name: this.name,
                phone: this.phone,
                account: this.account,
                authority: this.authority,
                remark: this.remark,
            }
            this.$http.post('/system/addnewuser',params).then((response)=>{
                if(response.data.status == '1') {
                    this.$layer.closeAll();
                    this.$layer.msg('添加成功');
                    Bus.$emit('afreshgetList',0);
                } else {
                    this.$layer.msg('添加失败');
                }
            })
        }
    }
}
</script>