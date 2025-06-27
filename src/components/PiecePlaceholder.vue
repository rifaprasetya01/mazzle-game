<script setup>
import {ref, defineExpose} from 'vue';

const placeholder = ref(null);

defineExpose({
  placeholder,
});
</script>

<template>
  <div class="placeholder" ref="placeholder" id="placeholder">
    <slot />
  </div>
</template>

<style scoped>
.placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: inset 2px 2px 20px rgba(0, 0, 0, 0.6);
}
</style>
