<script setup>
const emits = defineEmits(['gameReset']);
</script>

<template>
  <button class="start-btn" @click="emits('gameReset')">Reset Game</button>
</template>

<style scoped>
.start-btn {
  padding: 8px 16px;
}
</style>
