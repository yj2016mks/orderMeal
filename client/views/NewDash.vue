<template>
    <div id="addDashDiv">
        <label class="imgWrap" for='foodimage'>
            <div class="imgUp vertical-sty">
                <span>请选择图片</span>
                <img class="img1" v-bind:src="imgurl" />
            </div>
        </label>

        <div class="file-div">
            <input v-on:change='showPreview()' id="foodimage" name="foodimage" type="file" />
            <input id="status" name="status" type="hidden"/>
            <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
        </div>
        <ul>
            <li>
                <BaseInputText>
                    <template slot='necessary'>*</template>
                    <template slot='labelname'>名称</template>
                    <template slot='labelinput'>
                        <input v-model.trim='name' id="name" name="name" type="text" maxlength="30" placeholder="输入菜品">
                    </template>
                </BaseInputText>
            </li>
            <li>
                <BaseInputText>
                    <template slot='necessary'>*</template>
                    <template slot='labelname'>所属餐厅</template>
                    <template slot='labelinput'>
                        <input v-model='seller' id="seller" name="seller" type="text" maxlength="30" placeholder="输入餐厅">
                    </template>
                </BaseInputText>
            </li>
            <li>
                <BaseSwitchBtn>上架</BaseSwitchBtn>
            </li>
            <li>
                <BaseInputText>
                    <template slot='labelname'>备注</template>
                    <template slot='labelinput'>
                        <input v-model='remark' id="remark" name="remark" type="text" maxlength="30" placeholder="不超过30字">
                    </template>
                </BaseInputText>
            </li>
        </ul>
        <BaseDefaultBtn>
            <template slot='defaultbtn'>
                <button v-on:click='btnenter' type="button" class="confirm-btn">确定</button>
            </template>
        </BaseDefaultBtn>
    </div>
</template>

<script>
import Bus from '../router/bus.js'

export default {
    name:'newdash',
    data() {
        return {
            imgurl: '',
            name: '',
            seller: '',
            authority: 1,
            remark: ''
        }
    },
    created() {
        Bus.$on('switchchange',(authority) => {
            this.authority = authority;
        })
    },
    methods: {
        showPreview() {
            var source = document.getElementById('foodimage');
            var file = source.files[0];
            var that = this;
            if(window.FileReader) {
                var fr = new FileReader();
                fr.onloadend = function(e) {
                    that.imgurl = e.target.result;
                };
                fr.readAsDataURL(file);
            }
        },
        btnenter() {
            function nameSupport(name)
            {
                var reg = /^[\u4e00-\u9fa5]+$/;
                if (reg.test(name)){
                    return true;
                }
                return false;
            }
            var name = this.name;
            if(name.length <= 0) {
                this.$layer.msg('请填写菜品名称',{icon:7});
                return false;
            }
            if(!nameSupport(name)) {
                this.$layer.msg("菜品名称必须为汉字",{icon:7});
                return false;
            }
            if(!(name.length>=2 && name.length<=10)) {
                this.$layer.msg("菜品名称长度为2-10",{icon:7});
                return false;
            }
                var seller = this.seller;
                if(seller.length <= 0) {
                    this.$layer.msg('请填写所属饭店',{icon:7});
                    return false;
                }
                if(!nameSupport(seller)) {
                this.$layer.msg("所属饭店必须为汉字",{icon:7});
                return false;
            }
            if(!( seller.length<=10)) {
                this.$layer.msg("所属饭店长度不超过10",{icon:7});
                return false;
            }
            var params = {
                imgurl: this.imgurl,
                name: this.name,
                seller: this.seller,
                authority: this.authority,
                remark: this.remark,
                num: 0,
                shownoticebefore:true
            }
            this.$http.post('/operator/addnewdash',params).then((response) => {
                if(response.data.status == '1') {
                    this.$layer.closeAll();
                    this.$layer.msg('添加成功');
                    Bus.$emit('afreshdashList',response.data.result);
                } else {
                    this.$layer.msg('添加失败');
                }
            })
        }
    }
}
</script>