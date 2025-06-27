<script setup>
import {ref, watch, onMounted, computed} from 'vue';

const posterUrl = ref('');

const props = defineProps({
  slot: {
    require: true,
  },
  poster: {
    require: true,
    default: 'poster-1',
  },
});

const slotPositionX = ref(0);
const slotPositionY = ref(0);

watch(() => props.slot, updateSlot);
watch(() => props.poster, updatePoster);

onMounted(() => {
  updateSlot();
  updatePoster();
});

function updateSlot() {
  if (props.slot) {
    slotPositionX.value = props.slot.x;
    slotPositionY.value = props.slot.y;
  }
}

function updatePoster() {
  if (props.poster) {
    posterUrl.value = `/src/assets/${props.poster}.jpg`;
  }
}

const pieceStyle = computed(() => ({
  width: '500px',
  objectFit: 'cover',
  objectPosition: `-${props.slot.x}px -${props.slot.y}px`,
  height: '500px',
}));
</script>

<template>
  <div class="poster-piece">
    <img
      draggable="false"
      class="piece-img"
      v-bind:style="pieceStyle"
      :src="posterUrl"
      alt="poster piece" />
  </div>
</template>

<style scoped>
.poster-piece {
  width: 125px;
  aspect-ratio: 1 / 1;

  overflow: hidden;
  object-fit: cover;

  border: 1px solid black;
}
</style>

<!-- <script setup>
import {defineProps} from 'vue';

const props = defineProps({
  boardEl: Object,
});
</script>

<template>
  <div class="piece">
    <button>Click</button>
  </div>
</template>

<style scoped>
button {
  height: 125px;
  width: 125px;
}
</style> -->
