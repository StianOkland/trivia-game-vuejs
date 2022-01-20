import { createRouter, createWebHistory } from 'vue-router'
import StartScreen from './components/StartScreen.vue'
import Questions from './components/Questions.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
        path: '/',
        name: 'HomeScreen',
        component: StartScreen,
    },
    {
        path: '/questions',
        name: 'Questions',
        component: Questions
    }
  ]
})