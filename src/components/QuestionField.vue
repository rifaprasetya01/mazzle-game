<script setup>
import {defineProps, onMounted, watch, ref} from 'vue';

const question = ref('');

const props = defineProps({
  question: {
    type: Array,
    require: true,
    default: ['no question'],
  },
});

watch(() => props.question, updateQuestion);

onMounted(updateQuestion);

function updateQuestion() {
  question.value =
    props.question[Math.round(Math.random() * (props.question.length - 1))];
}
</script>

<template>
  <div class="question-field">
    <h3>Question:</h3>
    <p>{{ question }}</p>
  </div>
</template>

<style scoped>
.question-field {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
}
</style>
