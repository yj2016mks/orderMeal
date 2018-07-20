<template>
    <label class="switchBtn">
        <slot></slot>
        <div v-on:click='switchBtn()'>
            <span v-if='switchBtnOn' class="spanStop"><em class="emStop"></em></span>
            <span v-else class="spanStar"><em class="emStar"></em></span>
        </div>
    </label>
</template>

<script>
export default {
    data() {
        return {
            switchBtnOn:true
        }
    },
    methods: {
        switchBtn(event) {
            this.switchBtnOn = !this.switchBtnOn;
            this.$emit('switchchange',this.switchBtnOn)
        }
    }
}
</script>