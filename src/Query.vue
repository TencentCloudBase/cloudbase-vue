<template>
    <div>
        <slot v-bind="{ msg, text }"></slot>
    </div>
</template>

<script>
export default {
    data() {
        return {
            msg: "Hello world",
            text: '123'
        }
    }
}
</script>
