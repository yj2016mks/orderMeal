<template>
    <label>
        <em class="must-tip"><slot name='necessary'>*</slot></em>
        <slot name='labelname'></slot>
        <slot name='labelinput'></slot>
    </label>
</template>

<script>
export default {
    data() {
        return {
            
        }
    }
}
</script>