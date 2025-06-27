<script setup>
import {onMounted, reactive, ref} from 'vue';
import dataQuestions from '../assets/datas/questions.json';
import dataAnswers from '../assets/datas/answers.json';
import Board from '../components/Board.vue';
import Piece from '../components/Piece.vue';
import DraggableEl from '../components/DraggableEl.vue';

// ===========================================

const poster = ref('');
const pattern = ref(null);
const question = ref('');
const slot = ref([]);
const boardRef = ref(null);
const histories = ref([]); // => [[pX, pY, status]]
const currentPiece = ref([]);

function getRandomIndex(limit) {
  return Math.round(Math.random() * limit);
}

function getRandomPoster() {
  const posters = ['poster-1', 'poster-2', 'poster-3'];
  const randomIndex = getRandomIndex(posters.length - 1);
  const randomPoster = posters[randomIndex];
  poster.value = `/src/assets/${randomPoster}.jpg`;
}

function getRandomPattern() {
  const randomIndex = getRandomIndex(dataQuestions.length - 1);
  pattern.value = {
    questions: dataQuestions[randomIndex],
    answers: dataAnswers[randomIndex],
  };
}

function chooseRandomPiece() {
  const randomIndex1 = getRandomIndex(2);
  const randomIndex2 = getRandomIndex(2);

  chooseQuestionByPattern(randomIndex1, randomIndex2);
  chooseSlot(randomIndex1, randomIndex2);

  histories.value.push([slot.value[0], slot.value[1], false]);
  currentPiece.value = [slot.value[0], slot.value[1], false];
  console.log(histories.value);
}

function chooseQuestionByPattern(index, index2) {
  question.value = pattern.value.questions[index][index2];
}

function chooseSlot(index, index2) {
  const baseSlot = [
    // Row 1
    [
      [0, 0],
      [100, 0],
      [200, 0],
    ],
    // Row 2
    [
      [0, 100],
      [100, 100],
      [200, 100],
    ],
    // Row 3
    [
      [0, 200],
      [100, 200],
      [200, 200],
    ],
  ];

  slot.value = baseSlot[index][index2];
}

getRandomPoster();
getRandomPattern();
chooseRandomPiece();

// ===========================================
</script>

<template>
  <div class="container">
    <h1 class="heading">MAZZLE</h1>

    <h3 class="question">{{ question }}</h3>

    <main>
      <Board ref="boardRef" v-bind:dataPattern="pattern" :poster="poster" />

      <DraggableEl
        v-if="true"
        :getPiece="chooseRandomPiece"
        :boardEl="boardRef?.board"
        :pieceData="slot">
        <Piece v-bind:poster="poster" :slot="slot" />
      </DraggableEl>
      <DraggableEl
        v-if="false"
        :getPiece="chooseRandomPiece"
        :boardEl="boardRef?.board"
        :pieceData="slot">
        <Piece v-bind:poster="poster" :slot="slot" />
      </DraggableEl>
      <DraggableEl
        v-if="false"
        :getPiece="chooseRandomPiece"
        :boardEl="boardRef?.board"
        :pieceData="slot">
        <Piece v-bind:poster="poster" :slot="slot" />
      </DraggableEl>
      <DraggableEl
        v-if="false"
        :getPiece="chooseRandomPiece"
        :boardEl="boardRef?.board"
        :pieceData="slot">
        <Piece v-bind:poster="poster" :slot="slot" />
      </DraggableEl>
      <DraggableEl
        v-if="false"
        :getPiece="chooseRandomPiece"
        :boardEl="boardRef?.board"
        :pieceData="slot">
        <Piece v-bind:poster="poster" :slot="slot" />
      </DraggableEl>
      <DraggableEl
        v-if="false"
        :getPiece="chooseRandomPiece"
        :boardEl="boardRef?.board"
        :pieceData="slot">
        <Piece v-bind:poster="poster" :slot="slot" />
      </DraggableEl>
      <DraggableEl
        v-if="false"
        :getPiece="chooseRandomPiece"
        :boardEl="boardRef?.board"
        :pieceData="slot">
        <Piece v-bind:poster="poster" :slot="slot" />
      </DraggableEl>
      <DraggableEl
        v-if="false"
        :getPiece="chooseRandomPiece"
        :boardEl="boardRef?.board"
        :pieceData="slot">
        <Piece v-bind:poster="poster" :slot="slot" />
      </DraggableEl>
      <DraggableEl
        v-if="false"
        :getPiece="chooseRandomPiece"
        :boardEl="boardRef?.board"
        :pieceData="slot">
        <Piece v-bind:poster="poster" :slot="slot" />
      </DraggableEl>
    </main>
  </div>
</template>

<style scoped>
.container {
  /* background-color: #393232; */
  min-height: 100dvh;
  height: 100dvh;
  overflow: hidden;
}

.heading {
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: #3a6351;
  color: #f2edd7; */
}

.question {
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  /* background-color: #3a6351;
  color: #f2edd7; */
}
</style>
