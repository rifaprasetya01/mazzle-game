<script setup>
import {defineProps} from 'vue';

const props = defineProps({
  poster: {
    required: true,
  },
  slot: {
    require: true,
  },
});

const pieceStyle = {
  width: '300px',
  objectFit: 'cover',
  objectPosition: `-${props.slot[0]}px -${props.slot[1]}px`,
  height: '300px',
};
</script>

<template>
  <div class="poster-piece">
    <img
      draggable="false"
      class="piece-img"
      v-bind:style="pieceStyle"
      v-bind:src="props.poster"
      alt="poster piece" />
  </div>
</template>

<style scoped>
.poster-piece {
  width: 100px;
  aspect-ratio: 1 / 1;

  overflow: hidden;
  object-fit: cover;
}

/* .piece-img {
  width: 300px;
  object-fit: cover;
  object-position: -200px -100px;
  height: 300px;
} */
</style>
