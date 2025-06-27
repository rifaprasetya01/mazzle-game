<template>
  <div
    ref="box"
    :style="styleObject"
    @mousedown="startDrag"
    @mouseup="stopDrag"
    @mousemove="drag">
    <slot />
  </div>
</template>

<script setup>
import {ref, computed, defineProps} from 'vue';

const props = defineProps({
  boardEl: Object,
  pieceData: Object,
  getPiece: Function,
});

const gridSize = 100;

// Posisi elemen
const positionX = ref(window.innerWidth / 2 - gridSize / 2);
const positionY = ref(window.innerHeight / 2 + 150);

// Offset antara mouse dan posisi awal elemen
const offsetX = ref(0);
const offsetY = ref(0);

// Flags
const isDragging = ref(false);
const allowDrag = ref(false);

// Referensi ke elemen <div>
const box = ref(null);

// Style dinamis
const styleObject = computed(() => ({
  position: 'absolute',
  zIndex: 9999,
  left: `${positionX.value}px`,
  top: `${positionY.value}px`,
  background: '#eee',
  userSelect: 'none',
  cursor: allowDrag.value ? 'move' : 'default',
  border: allowDrag.value ? '1px solid red' : 'none',
}));

// Mulai drag saat mouse ditekan
function startDrag(event) {
  allowDrag.value = !allowDrag.value;

  if (!allowDrag.value) return;
  isDragging.value = true;
  offsetX.value = event.clientX - positionX.value;
  offsetY.value = event.clientY - positionY.value;
}

// Hentikan drag saat mouse dilepas
function stopDrag(event) {
  if (!isDragging.value) return;

  allowDrag.value = !allowDrag.value;
  isDragging.value = false;

  const boardReact = props.boardEl.getBoundingClientRect();
  const relativeX = event.clientX - boardReact.left;
  const relativeY = event.clientY - boardReact.top;

  const snappedX = Math.floor(relativeX / gridSize) * gridSize;
  const snappedY = Math.floor(relativeY / gridSize) * gridSize;

  positionX.value = snappedX + boardReact.left;
  positionY.value = snappedY + boardReact.top;
  if (
    positionX.value != props.pieceData[0] + boardReact.left ||
    positionY.value != props.pieceData[1] + boardReact.top
  ) {
    positionX.value = window.innerWidth / 2 - gridSize / 2;
    positionY.value = window.innerHeight / 2 + 150;
  } else {
    props.getPiece();
  }
}

// Geser elemen selama mouse digerakkan
function drag(event) {
  if (!isDragging.value || !allowDrag.value) return;
  positionX.value = event.clientX - offsetX.value;
  positionY.value = event.clientY - offsetY.value;
}
</script>

<style scoped>
div {
  text-align: center;
}
</style>
