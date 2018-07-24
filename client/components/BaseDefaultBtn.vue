<template>
    <div class="margt-max-l fr">
        <button type="button" class="cancel-btn" v-on:click='btncancel'>取消</button>
        <slot name='defaultbtn'></slot>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
        btncancel() {
            this.$layer.closeAll();
        }
    }
}
</script>