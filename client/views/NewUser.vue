<template>
    <div id="addUseDiv">
        <form id="dataform" action="${ctx}/user/create" method="post">
        <ul>
            <input type="hidden" name="type" id="type"/>
            <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
            
            <li>
                <BaseInputText>
                    <template slot='necessary'>*</template>
                    <template slot='labelname'>姓名</template>
                    <template slot='labelinput'>
                        <input id = "name" name = "name" type="text" maxlength="30" placeholder="员工真实姓名"/>
                    </template>
                </BaseInputText>
            </li>
            <li>
                <BaseInputText>
                    <template slot='labelname'>手机号</template>
                    <template slot='labelinput'>
                        <input id = "phone" name = "phone" type="text" maxlength="30" placeholder="员工联系方式"/>
                    </template>
                </BaseInputText>
            </li>
            <li>
                <BaseInputText>
                    <template slot='necessary'>*</template>
                    <template slot='labelname'>账号/密码</template>
                    <template slot='labelinput'>
                        <input id = "userName" name = "userName" readonly="readonly" type="text" placeholder="账号初始密码相同" maxlength="30"/>
                    </template>
                </BaseInputText>
            </li>
            <li>
                <BaseSwitchBtn>操作员权限</BaseSwitchBtn>
            </li>
            <li>
                <BaseInputText>
                    <template slot='labelname'>备注</template>
                    <template slot='labelinput'>
                        <input id = "remark" name = "remark" type="text" maxlength="30" placeholder="最多三十个字符"/>
                    </template>
                </BaseInputText>
            </li>
        </ul>
        <BaseDefaultBtn></BaseDefaultBtn>
        </form>
    </div>
</template>