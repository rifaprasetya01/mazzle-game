<script setup>
import {ref, watch} from 'vue';
import PuzzleBoard from '../components/PuzzleBoard.vue';
import PuzzlePiece from '../components/PuzzlePiece.vue';
import PiecePlaceholder from '../components/PiecePlaceholder.vue';
import QuestionField from '../components/QuestionField.vue';
import DraggerElement from '../components/DraggerElement.vue';
import StartButton from '../components/StartButton.vue';
import ResetGameButton from '../components/ResetGameButton.vue';
import slotDatas from '../assets/datas/slots.json';
import questionsDatas from '../assets/datas/questions.json';
import answersDatas from '../assets/datas/answers.json';

// Datas
const slots = ref(slotDatas);
const currentSelectedSlot = ref({});
const questions = ref(questionsDatas);
const answers = ref(answersDatas);
const pattern = ref({question: [], answer: []});
const poster = ref('poster-1');
const gameOptions = ref({
  isStarted: false,
  isWon: false,
});

// Element Ref
const boardRef = ref(null);
const placeholderRef = ref(null);

// Functions
function getRandomIndex(limit) {
  return Math.round(Math.random() * limit);
}

function startGame() {
  if (!gameOptions.value.isStarted) {
    gameOptions.value.isStarted = true;
  }
}

function resetGame() {
  if (gameOptions.value.isStarted && gameOptions.value.isWon) {
    gameOptions.value.isStarted = false;
    gameOptions.value.isWon = false;

    slots.value = slots.value.map((el) => {
      el.status = false;

      return el;
    });

    if (boardRef) {
      boardRef.value.cells.forEach((cell) => {
        cell.style.backgroundColor = 'white';
        cell.style.color = 'black';
      });
    }
  }
}

function getSlot() {
  const filteredData = slots.value.filter((el) => el.status === false);
  if (filteredData.length > 0) {
    const selectedSlot = filteredData[getRandomIndex(filteredData.length - 1)];
    currentSelectedSlot.value = selectedSlot;
  } else {
    currentSelectedSlot.value = null;
    if (gameOptions.value.isStarted && !gameOptions.value.isWon) {
      gameOptions.value.isWon = true;
    }
  }
}

function shufflePattern(questions, answers) {
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    const temp1 = questions[i];
    questions[i] = questions[j];
    questions[j] = temp1;

    const temp2 = answers[i];
    answers[i] = answers[j];
    answers[j] = temp2;
  }

  return {
    questions,
    answers,
  };
}

function getPattern() {
  const randomIndex = getRandomIndex(answers.value.length - 1);
  const selectedQuestionPattern = questions.value[randomIndex];
  const selectedAnswerPattern = answers.value[randomIndex];
  const selectedPattern = shufflePattern(
    selectedQuestionPattern,
    selectedAnswerPattern
  );
  pattern.value.question = selectedPattern.questions;
  pattern.value.answer = selectedPattern.answers;
}

function getPoster() {
  const posters = ['poster-1', 'poster-2', 'poster-3'];
  poster.value = posters[getRandomIndex(posters.length - 1)];
}

watch(
  () => [gameOptions.value.isStarted],
  () => {
    getSlot();
    getPattern();
    getPoster();
  }
);
</script>

<template>
  <header>
    <h1>Game Board</h1>
  </header>
  <main>
    <div class="board-container">
      <PuzzleBoard
        :answerPattern="pattern.answer"
        ref="boardRef"
        :gameStarted="gameOptions.isStarted"
        :gameWon="gameOptions.isWon"
        :poster="poster" />
    </div>

    <aside>
      <QuestionField
        :question="
          gameOptions.isStarted
            ? pattern.question[
                currentSelectedSlot ? currentSelectedSlot.key : -1
              ]
            : ['No Question']
        " />

      <PiecePlaceholder ref="placeholderRef">
        <DraggerElement
          v-if="gameOptions.isStarted && !gameOptions.isWon"
          :placeholderEl="placeholderRef?.placeholder"
          :boardEl="boardRef?.board"
          :cellEls="boardRef?.cells"
          :currentSlot="currentSelectedSlot"
          :getSlotFn="getSlot">
          <PuzzlePiece :poster="poster" :slot="currentSelectedSlot" />
        </DraggerElement>
        <StartButton
          v-if="!gameOptions.isStarted && !gameOptions.isWon"
          @gameStar="startGame" />
        <ResetGameButton
          v-if="gameOptions.isStarted && gameOptions.isWon"
          @gameReset="resetGame" />
      </PiecePlaceholder>
    </aside>
  </main>
</template>

<style scoped>
main {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 20px;

  overflow: auto;
}

aside {
  min-width: 300px;
  width: 100%;

  display: grid;
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;
}
</style>
