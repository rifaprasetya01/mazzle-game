<script setup>
import {ref, defineExpose, defineProps, onMounted} from 'vue';

const board = ref(null);

const props = defineProps({
  dataPattern: Object,
  poster: {
    require: true,
  },
});

defineExpose({board});
</script>

<template>
  <div class="board" ref="board">
    <img class="board-poster" :src="poster" alt="poster board" />
    <div class="pieces">
      <div class="row-pieces" v-for="answer in props.dataPattern.questions">
        <div class="col-pieces" v-for="a in answer">{{ a }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.board {
  margin: auto;
  padding: 5px;

  overflow: hidden;
  width: 300px;
  height: 300px;
  position: relative;
}

.board-poster {
  width: 300px;
  object-fit: cover;
  height: 300px;
}

.pieces {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 300px;
  height: 300px;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  border: 1px solid black;
  opacity: 0.7;
}

.row-pieces {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.col-pieces {
  border: 1px solid black;
  background-color: white;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
