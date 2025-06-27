<script setup>
import {ref, defineProps, onMounted, computed, watch, onUpdated} from 'vue';

const props = defineProps({
  placeholderEl: Object,
  boardEl: Object,
  cellEls: Array,
  currentSlot: Object,
  getSlotFn: Function,
});

const dragBox = ref(null);

const gridSize = 125;

const defaultPositionX = ref(0);
const defaultPositionY = ref(0);

const positionX = ref(0);
const positionY = ref(0);

const offsetX = ref(0);
const offsetY = ref(0);

const isDragging = ref(false);
const allowDrag = ref(false);

watch(() => props.placeholderEl, updatePosition);

onMounted(updatePosition);

const styleObject = computed(() => ({
  position: 'absolute',
  zIndex: 9999,
  left: `${positionX.value}px`,
  top: `${positionY.value}px`,
  background: '#eee',
  userSelect: 'none',
  cursor: allowDrag.value ? 'move' : 'default',
}));

function updatePosition() {
  if (props.placeholderEl) {
    const placeholder = props.placeholderEl.getBoundingClientRect();

    positionX.value = placeholder.x + placeholder.width / 2 - gridSize / 2;
    positionY.value = placeholder.y + placeholder.height / 2 - gridSize / 2;

    defaultPositionX.value =
      placeholder.x + placeholder.width / 2 - gridSize / 2;
    defaultPositionY.value =
      placeholder.y + placeholder.height / 2 - gridSize / 2;
  }
}

function startDrag(event) {
  allowDrag.value = !allowDrag.value;

  if (!allowDrag.value) {
    return;
  }

  isDragging.value = true;
  offsetX.value = event.clientX - positionX.value;
  offsetY.value = event.clientY - positionY.value;
}

function stopDrag(event) {
  if (!isDragging.value) return;

  allowDrag.value = !allowDrag.value;
  isDragging.value = false;

  const boardRect = props.boardEl.getBoundingClientRect();
  const relativeX = event.clientX - boardRect.left;
  const relativeY = event.clientY - boardRect.top;

  const snappedX = Math.floor(relativeX / gridSize) * gridSize;
  const snappedY = Math.floor(relativeY / gridSize) * gridSize;

  positionX.value = snappedX + boardRect.left;
  positionY.value = snappedY + boardRect.top;

  if (
    positionX.value === props.currentSlot.x + boardRect.left &&
    positionY.value === props.currentSlot.y + boardRect.top
  ) {
    props.currentSlot.status = true;
    props.cellEls[props.currentSlot.key].style.backgroundColor = 'transparent';
    props.cellEls[props.currentSlot.key].style.color = 'transparent';
  }

  positionX.value = defaultPositionX.value;
  positionY.value = defaultPositionY.value;

  props.getSlotFn();
}

function drag(event) {
  if (!isDragging.value || !allowDrag.value) return;
  positionX.value = event.clientX - offsetX.value;
  positionY.value = event.clientY - offsetY.value;
}
</script>

<template>
  <div
    :style="styleObject"
    ref="dragBox"
    @mousedown="startDrag"
    @mouseup="stopDrag"
    @mousemove="drag">
    <slot />
  </div>
</template>

<style scoped></style>
