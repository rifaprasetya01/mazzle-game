<script setup>
import {defineEmits} from 'vue';

const emits = defineEmits(['gameStar']);
</script>

<template>
  <button class="start-btn" @click="emits('gameStar')">Started</button>
</template>

<style scoped>
.start-btn {
  padding: 8px 16px;
  
}
</style>
