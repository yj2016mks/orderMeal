<template>
    <div class="syst-set j-tab-con">
        <div class="deadlineTime clear-float line-height">
            <span>订餐截止时间</span>
            <ul class="clear-float">
                <li><label><input type="radio" name="deadline" checked="checked">17:30</input></label></li>
                <li><label><input type="radio" name="deadline">18:00</input></label></li>
                <li><label><input type="radio" name="deadline">18:30</input></label></li>
                <li><label><input type="radio" name="deadline">19:00</input></label></li>
            </ul>
        </div>
        <div class="remindTime clear-float line-height">
            <span>订餐结束前提醒</span>
            <ul class="clear-float">
                <li><label><input type="radio" name="remind" checked="checked">10分钟</input></label></li>
                <li><label><input type="radio" name="remind">30分钟</input></label></li>
                <li><label><input type="radio" name="remind">60分钟</input></label></li>
            </ul>
        </div>
        <div class="remindSwitch line-height">
            <span>订餐信息提醒</span>
            <BaseSwitchBtn></BaseSwitchBtn>
            <div class="margt-max"><button class="confirm-btn configconfirm" type='button'>保存</button></div>
        </div>
    </div>
</template>

<script>
export default {
    name:'ManagementOrder',
    data() {
        return {}
    }
}
</script>