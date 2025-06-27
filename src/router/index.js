import {createRouter, createWebHistory} from 'vue-router';
import MainMenu from '../views/MainMenu.vue';
import GameBoard from '../views/GameBoard.vue';

const routes = [
  {path: '/', name: 'MainMenu', component: MainMenu},
  {path: '/gameboard', name: 'GameBoard', component: GameBoard},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
