<script setup>
import {computed, ref, defineProps, watch, onMounted} from 'vue';

const board = ref(null);
const cells = ref([]);
const answerPattern = ref(null);

const props = defineProps({
  poster: {
    require: true,
    default: 'poster-1',
  },
  answerPattern: {
    require: true,
  },
  gameStarted: {
    require: true,
    default: false,
  },
  gameWon: {
    require: true,
    default: false,
  },
});

watch(() => props.answerPattern, updatePattern);

onMounted(updatePattern);

function updatePattern() {
  answerPattern.value = props.answerPattern;
}

const dynamicStyle = computed(() => ({
  backgroundImage: props.gameStarted
    ? `url('/src/assets/${props.poster}.jpg')`
    : 'none',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
}));

function registerCell(el) {
  cells.value.push(el);
}

defineExpose({
  board,
  cells,
});
</script>

<template>
  <div :style="dynamicStyle" class="puzzle-board" ref="board">
    <div
      v-show="props.gameStarted && !props.gameWon"
      v-for="(answer, index) in answerPattern"
      :key="`row-${index}`"
      :ref="registerCell"
      class="board-cell">
      {{ answer }}
    </div>
  </div>
</template>

<style scoped>
.puzzle-board {
  width: 500px;
  height: 500px;

  display: grid;
  grid-template-columns: repeat(4, 1fr);

  outline: 3px solid black;

  background-color: white;
}

.board-cell {
  display: flex;
  justify-content: center;
  align-items: center;

  outline: 1px solid black;

  background-color: white;
  opacity: 1;
}
</style>
