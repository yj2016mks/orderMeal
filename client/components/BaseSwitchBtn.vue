<template>
    <label class="switchBtn">
        <slot></slot>
        <div v-on:click='switchBtn'>
            <span v-if='switchBtnOn' class="spanStar"><em class="emStar"></em></span>
            <span v-else class="spanStop"><em class="emStop"></em></span>
        </div>
    </label>
</template>

<script>
import Bus from '../router/bus.js'

export default {
    data() {
        return {
            switchBtnOn:true
        }
    },
    methods: {
        switchBtn(event) {
            this.switchBtnOn = !this.switchBtnOn;
            Bus.$emit('switchchange',this.switchBtnOn)
        }
    }
}
</script>